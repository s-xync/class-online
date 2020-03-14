const router = require("express").Router();
const UserControllers = require("../controllers/user.controllers");
const asyncHandler = require("../middleware/asyncHandler.middleware");
const { check } = require("express-validator");

router.post(
  "/login",
  [
    check("email") // required + email
      .isEmail()
      .withMessage("Please enter valid email address.")
  ],
  asyncHandler(UserControllers.login)
);

module.exports = router;
