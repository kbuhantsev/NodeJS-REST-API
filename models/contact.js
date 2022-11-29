const { Schema, model } = require("mongoose");
const Joi = require("joi");

const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for contact is required"],
    },
    email: {
      type: String,
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
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contact);

const addContactSchema = Joi.object(
  {
    name: Joi.string().min(2).required(),
    email: Joi.string().email({ allowFullyQualified: true }).required(),
    phone: Joi.string()
      .pattern(new RegExp(phoneRegExp))
      .error(new Error("phone number is not valid!"))
      .required(),
    favorite: Joi.boolean().default(false),
  },
  [{ abortEarly: false }]
)
  .required()
  .error(new Error("missing fields"));

const patchFavoriteSchema = Joi.object(
  {
    favorite: Joi.boolean()
      .required()
      .error(new Error("missing field favorite")),
  },
  [{ abortEarly: false }]
)
  .required()
  .error(new Error("missing fields"));

module.exports = {
  Contact,
  addContactSchema,
  patchFavoriteSchema,
};
