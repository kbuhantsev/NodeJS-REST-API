const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { emailRegexp } = require("../config/regExps");
const bCrypt = require("bcryptjs");
const gravatar = require("gravatar");

const USER_SUBSCRIPTION = ["starter", "pro", "business"];

const user = Schema(
  {
    password: {
      type: String,
      minlength: 5,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: USER_SUBSCRIPTION,
      default: USER_SUBSCRIPTION[0],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      // required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

user.methods.setDefaultAvatar = function (email) {
  try {
    this.avatarURL = gravatar.url(email, { protocol: "http", size: "250" });
  } catch (error) {
    console.log(error.messages);
  }
};

const User = model("user", user);

const addUserSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
    "string.min": "password requires min 5 characters",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "email is required!",
    "string.pattern.base": "email {{email}} is not valid!",
  }),
  subscription: Joi.string().valid(...USER_SUBSCRIPTION),
  token: Joi.string(),
});

const patchSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...USER_SUBSCRIPTION)
    .required(),
});

module.exports = {
  User,
  addUserSchema,
  patchSubscriptionSchema,
};
