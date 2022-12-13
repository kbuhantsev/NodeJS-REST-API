const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendGridSendEmail = async (data) => {
  const msg = { ...data, from: "k.buhantsev@meta.ua" };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error.response.body);
    return false;
  }

  return true;
};

module.exports = sendGridSendEmail;
