const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

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

router.get("/", async (_, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  const { value, error } = addContactSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
    return;
  }

  const contact = await addContact(value);
  if (contact) {
    res.json(contact);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/:contactId", async (req, res) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    const result = await removeContact(contact.id);
    if (result) {
      res.json({ message: "contact deleted" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res) => {
  const { value, error } = updateContactSchema.validate(req.body);
  if (error) {
    res.status(404).json({ message: error.message });
    return;
  }

  const contact = await getContactById(req.params.contactId);
  if (contact) {
    const updatedContact = await updateContact(contact.id, value);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
