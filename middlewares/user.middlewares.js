const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const boom = require("boom");

const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (!bearerHeader) {
      return next(boom.unauthorized("Not logged in. Please login."));
    }

    const bearer = bearerHeader.split(" ");

    if (!bearer[1]) {
      return next(boom.unauthorized("Not logged in. Please login."));
    }

    req.token = bearer[1];

    jwt.verify(req.token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return next(boom.unauthorized("Token expired. Please login."));
      }

      const user = await User.findOne({ _id: decoded._id });

      if (!user) {
        return next(boom.unauthorized("Token expired. Please login."));
      }

      req.user = user;

      next();
    });
  } catch (err) {
    return next(boom.internal("Internal Server Error"));
  }
};

module.exports = { verifyToken };
