const User = require("../models/user.model");
const HttpStatus = require("http-status-codes");
const boom = require("boom");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
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
    throw boom.notFound("User not found. Please signup.");
  }

  if (userExists && !userExists.verified) {
    throw boom.badData("User not verified yet. Please signup again.");
  }

  const isValid = await bcrypt.compare(password, userExists.password);

  if (!isValid) {
    throw boom.badData(
      "Incorrect password. Please check password and try again."
    );
  }

  const jwtToken = jwt.sign(
    { _id: String(userExists._id), email: userExists.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  ); // expires in 24 hours

  return res.json({
    message: "Logged in successfully.",
    user: userExists,
    jwt: jwtToken
  });
};

module.exports = { login };
