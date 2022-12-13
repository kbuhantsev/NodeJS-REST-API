const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGridSendEmail = async (data) => {
  const msg = { ...data, from: "k.buhantsev@meta.ua" };
  // to: "perfection1270@gmail.com",
  // from: "k.buhantsev@meta.ua",
  // subject: "Sending with SendGrid is Fun",
  // text: "and easy to do anywhere, even with Node.js",
  // html: "<strong>and easy to do anywhere, even with Node.js</strong>",

  try {
    const response = await sgMail.send(msg);
    console.log(response[0].statusCode);
    console.log(response[0].headers);
  } catch (error) {
    console.error(error.response.body);
    return false;
  }

  return true;
};

module.exports = sendGridSendEmail;
