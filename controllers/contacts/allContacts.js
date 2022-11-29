const { Contact } = require("../../models/contact");

const allContacts = async (_, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

module.exports = allContacts;
