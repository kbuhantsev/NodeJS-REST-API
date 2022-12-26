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
    const result = await transporter.sendMail(emailOptions);
    return result;
  } catch (error) {
    console.log(error.message);
    return { rejected: [null], responce: error.message };
  }
};

module.exports = metaSendEmail;
