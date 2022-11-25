const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../service");

const {
  addContactSchema, //
  updateContactSchema,
  patchFavoriteSchema,
} = require("../schemas");

const allContacts = async (_, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const newContact = async (req, res) => {
  const { value, error } = addContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
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
  const { contactId } = req.params;
  const { deletedCount } = await removeContact(contactId);
  if (deletedCount) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const putContact = async (req, res) => {
  const { value, error } = updateContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, value);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

const patchFavorite = async (req, res) => {
  const { value, error } = patchFavoriteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(contactId, value);
  if (updatedContact) {
    res.json(updatedContact);
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
  patchFavorite,
};
