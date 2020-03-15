const Video = require("../models/video.model");

module.exports.videos = async (req, res) => {
  const videos = await Video.find();
  return res.json({ message: "Videos retrieved successfully", videos });
};

module.exports.uploadVideo = async (req, res) => {
  const { key, bucket, location, originalname, mimetype, size } = req.file;
  let { customFileName } = req.body;
  const videoPayload = {
    key,
    bucket,
    location,
    originalname,
    mimetype,
    size,
    user: req.user._id,
    fileName: customFileName || originalname
  };
  const video = await Video.create(videoPayload);
  const videos = await Video.find();
  return res.json({ message: "Video uploaded successfully", video, videos });
};
