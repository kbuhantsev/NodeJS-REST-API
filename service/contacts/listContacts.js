const Contact = require("../models/contact");

const listContacts = async () => {
  return await Contact.find({});
};

module.exports = listContacts;
