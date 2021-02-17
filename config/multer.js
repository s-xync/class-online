const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const constants = require("./constants");

console.log(
  constants.AWS_ACCESS_KEY_ID,
  constants.AWS_SECRET_ACCESS_KEY,
  constants.AWS_S3_BUCKET_NAME
);

const s3 = new AWS.S3({
  accessKeyId: constants.AWS_ACCESS_KEY_ID,
  secretAccessKey: constants.AWS_SECRET_ACCESS_KEY,
});

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: constants.AWS_S3_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

module.exports = { uploadS3 };
