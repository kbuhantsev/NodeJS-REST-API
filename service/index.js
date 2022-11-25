const Contact = require("./schemas/contact");

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactId) => {
  return await Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return await Contact.deleteOne({ _id: contactId });
};

const addContact = async (body) => {
  return await Contact.create({ ...body });
};

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    contactId, //
    body, //
    { new: true }
  );
};

const updateStatusContact = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
