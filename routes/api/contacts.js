const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const contact = await addContact(req.body);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
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

router.put("/:contactId", async (req, res, next) => {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: "missing fields" });
  }

  const contact = await getContactById(req.params.contactId);
  if (contact) {
    const updatedContact = await updateContact(contact.id, req.body);
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
