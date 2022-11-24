const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { addContactSchema, updateContactSchema } = require("../schemas");

const allContacts = async (_, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const newContact = async (req, res) => {
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
};

const contactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const deleteContact = async (req, res) => {
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
};

const putContact = async (req, res) => {
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
};

module.exports = {
  allContacts,
  newContact,
  contactById,
  deleteContact,
  putContact,
};
