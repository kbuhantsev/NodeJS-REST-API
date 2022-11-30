const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { emailRegexp } = require("../config/regExps");
const { string } = require("joi");

const USER_SUBSCRIPTION = ["starter", "pro", "business"];

const user = Schema(
  {
    password: {
      type: String,
      minlength: 6,
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
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", user);

const addUserSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "password requires min 6 characters",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "email is required!",
    "string.pattern.base": `email {{email}} is not valid!`,
  }),
  subscription: Joi.string().valueOf(...USER_SUBSCRIPTION),
  token: Joi.string(),
});

module.exports = {
  User,
  addUserSchema,
};
