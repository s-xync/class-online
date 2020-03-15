const mailgun = require("mailgun-js");
const constants = require("./constants");

const mailgunHelper = mailgun({
  apiKey: constants.MAILGUN_API_KEY,
  domain: constants.MAILGUN_DOMAIN_NAME
});

module.exports = { mailgunHelper };
