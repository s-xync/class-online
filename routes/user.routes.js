const router = require("express").Router();
const UserControllers = require("../controllers/user.controllers");
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const { check } = require("express-validator");

router.post(
  "/login",
  [
    check("email") // required + email
      .isEmail()
      .withMessage("Email address must be valid.")
  ],
  asyncHandler(UserControllers.login)
);

router.post(
  "/signup",
  [
    check("email") // required + email
      .isEmail()
      .withMessage("Email address must be valid."),
    check("password") // required + min length 8 + other validations
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 chars long.")
      .matches(/\d/)
      .withMessage("Password must contain a number.")
      .matches(/[A-Z]/)
      .withMessage("Password must contain an uppercase.")
      .matches(/[a-z]/)
      .withMessage("Password must contain a lowercase.")
  ],
  asyncHandler(UserControllers.signup)
);

router.post(
  "/verifyotp",
  [
    check("email") // required + email
      .isEmail()
      .withMessage("Email address must be valid."),
    check("otp") // required + length 6
      .isLength({ min: 6, max: 6 })
      .withMessage("OTP must be 6 digits.")
  ],
  asyncHandler(UserControllers.verifyOtp)
);

module.exports = router;
