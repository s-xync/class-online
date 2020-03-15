// read .env file into environment
require("dotenv").config();

const devConfig = {};

const testConfig = {};

const prodConfig = {};

const defaultConfig = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/classonline",
  JWT_SECRET: process.env.JWT_SECRET,
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN_NAME: process.env.MAILGUN_DOMAIN_NAME,
  MAILGUN_FROM: process.env.MAILGUN_FROM,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

module.exports = {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
