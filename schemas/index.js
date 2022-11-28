const Joi = require("joi");

const regExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const addContactSchema = Joi.object(
  {
    name: Joi.string().min(2).required(),
    email: Joi.string().email({ allowFullyQualified: true }).required(),
    phone: Joi.string()
      .pattern(new RegExp(regExp))
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
  addContactSchema,
  patchFavoriteSchema,
};
