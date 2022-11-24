const Joi = require("joi");

const regExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(new RegExp(regExp))
    .error(new Error("phone number is not valid!"))
    .required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
    .pattern(new RegExp(regExp))
    .error(new Error("phone number is not valid!")),
}).min(1);

module.exports = {
  addContactSchema,
  updateContactSchema,
};
