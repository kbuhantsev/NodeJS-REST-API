const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { emailRegexp, phoneRegExp } = require("../config/regExps");

const contact = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      required: [true, "Name for contact is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: {
      type: String,
      match: phoneRegExp,
      required: [true, "Phone number is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contact);

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .error(new Error("phone number is not valid!"))
    .required(),
  favorite: Joi.boolean().default(false),
})
  .required()
  .error(new Error("missing fields"));

const patchFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().error(new Error("missing field favorite")),
})
  .required()
  .error(new Error("missing fields"));

module.exports = {
  Contact,
  addContactSchema,
  patchFavoriteSchema,
};
