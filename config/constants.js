// read .env file into environment
require("dotenv").config();

const devConfig = {};

const testConfig = {};

const prodConfig = {};

const defaultConfig = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/classonline",
  JWT_SECRET: process.env.JWT_SECRET
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
