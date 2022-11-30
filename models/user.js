const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { emailRegexp } = require("../config/regExps");
const bCrypt = require("bcryptjs");

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
  },
  { versionKey: false, timestamps: true }
);

user.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};

user.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = model("user", user);

const addUserSchema = Joi.object({
  password: Joi.string().min(5).required().messages({
    "string.min": "password requires min 5 characters",
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
