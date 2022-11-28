const Contact = require("../schemas/contact");

const removeContact = async (contactId) => {
  return await Contact.deleteOne({ _id: contactId });
};

module.exports = removeContact;
