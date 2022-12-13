const nodemailer = require("nodemailer");
require("dotenv").config();

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "k.buhantsev@meta.ua",
    pass: process.env.META_PASSW,
  },
};

const metaSendEmail = async (data) => {
  const transporter = nodemailer.createTransport(config);
  const emailOptions = { ...data, from: "k.buhantsev@meta.ua" };

  try {
    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
    return false;
  }

  return true;
};

module.exports = metaSendEmail;
