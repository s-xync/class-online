const User = require("../models/user.model");
const boom = require("boom");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const constants = require("../config/constants");
const { mailgunHelper } = require("../config/mailgun");
const { otplibAuthenticator } = require("../config/otplib");

const saltRounds = 10;

module.exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw boom.badData(
      errors
        .array()
        .map(error => error.msg)
        .join(" ")
    );
  }

  let { email, password } = req.body;

  email = email.toLowerCase();

  const userExists = await User.findOne({ email });

  if (userExists && !userExists.verified) {
    const otp = otplibAuthenticator.generate(userExists.email);

    const mailData = {
      from: constants.MAILGUN_FROM,
      to: userExists.email,
      subject: `Your OTP is ${otp}`,
      text: `Your OTP for Class Online is ${otp}`
    };

    try {
      await mailgunHelper.messages().send(mailData);
    } catch (err) {
      throw boom.badRequest(
        "User already exists. But unable to send OTP to this email."
      );
    }

    return res.json({
      message: "User already exists. OTP sent to your email."
    });
  }

  if (userExists && userExists.verified) {
    throw boom.badData("User already exists. Please login.");
  }

  password = await bcrypt.hash(password, saltRounds);

  const user = await User.create({ email, password });

  const otp = otplibAuthenticator.generate(user.email);

  const mailData = {
    from: constants.MAILGUN_FROM,
    to: user.email,
    subject: `Your OTP is ${otp}`,
    text: `Your OTP for Class Online is ${otp}`
  };

  try {
    await mailgunHelper.messages().send(mailData);
  } catch (err) {
    throw boom.badRequest("User created but unable to send OTP to this email.");
  }

  return res.json({
    message: "User created successfully. OTP sent to your email."
  });
};

module.exports.verifyOtp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw boom.badData(
      errors
        .array()
        .map(error => error.msg)
        .join(" ")
    );
  }

  let { email, otp } = req.body;

  email = email.toLowerCase();

  const userExists = await User.findOne({ email });

  if (userExists && !userExists.verified) {
    const isValid = otplibAuthenticator.verify({
      token: otp,
      secret: userExists.email
    });

    if (!isValid) {
      throw boom.badData("Invalid OTP. Please check OTP and try again.");
    }

    userExists.verified = true;

    await userExists.save();

    const jwtToken = jwt.sign(
      { _id: String(userExists._id), email: userExists.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    ); // expires in 24 hours

    return res.json({
      message: "Registered successfully. Logged in successfully.",
      user: userExists,
      jwt: jwtToken
    });
  }

  if (userExists && userExists.verified) {
    throw boom.badData("User already exists. Please login.");
  }

  throw boom.notFound("User not found. Please signup.");
};

module.exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw boom.badData(
      errors
        .array()
        .map(error => error.msg)
        .join(" ")
    );
  }

  let { email, password } = req.body;

  email = email.toLowerCase();

  const userExists = await User.findOne({ email });

  if (!userExists) {
    throw boom.badData(
      "User not found or password incorrect. Please try again."
    );
  }

  if (userExists && !userExists.verified) {
    throw boom.badData("User not verified yet. Please signup again.");
  }

  const isValid = await bcrypt.compare(password, userExists.password);

  if (!isValid) {
    throw boom.badData(
      "User not found or password incorrect. Please try again."
    );
  }

  const jwtToken = jwt.sign(
    { _id: String(userExists._id), email: userExists.email },
    constants.JWT_SECRET,
    { expiresIn: "24h" }
  ); // expires in 24 hours

  return res.json({
    message: "Logged in successfully.",
    user: userExists,
    jwt: jwtToken
  });
};
