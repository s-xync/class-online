const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const UserMiddlewares = require("../middlewares/user.middlewares");
const VideoControllers = require("../controllers/video.controllers");

router.get(
  "/videos",
  UserMiddlewares.verifyToken,
  asyncHandler(VideoControllers.videos)
);

module.exports = router;
