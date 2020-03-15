const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true
    },
    bucket: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    originalname: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    mimetype: {
      type: String
    },
    size: {
      type: Number
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
