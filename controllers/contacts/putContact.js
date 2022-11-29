const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const putContact = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    throw NotFound("Not found");
  }
};

module.exports = putContact;
