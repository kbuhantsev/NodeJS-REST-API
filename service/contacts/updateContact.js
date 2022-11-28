const Contact = require("../schemas/contact");

const updateContact = async (contactId, body) => {
  return await Contact.findByIdAndUpdate(
    contactId, //
    body, //
    { new: true }
  );
};

module.exports = {
  updateContact,
};
