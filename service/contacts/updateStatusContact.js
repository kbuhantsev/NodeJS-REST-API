const Contact = require("../schemas/contact");

const updateStatusContact = async (contactId, { favorite }) => {
  return await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
};

module.exports = updateStatusContact;
