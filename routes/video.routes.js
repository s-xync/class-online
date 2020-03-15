const router = require("express").Router();
const asyncHandler = require("../middlewares/asyncHandler.middleware");
const UserMiddlewares = require("../middlewares/user.middlewares");
const VideoControllers = require("../controllers/video.controllers");
const { uploadS3 } = require("../config/multer");

router.get(
  "/videos",
  UserMiddlewares.verifyToken,
  asyncHandler(VideoControllers.videos)
);

router.post(
  "/upload",
  UserMiddlewares.verifyToken,
  uploadS3.single("file"),
  asyncHandler(VideoControllers.uploadVideo)
);

module.exports = router;
