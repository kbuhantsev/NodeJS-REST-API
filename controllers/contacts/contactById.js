const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const contactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    throw NotFound(`Can not find contact with ID:${contactId}`);
  }
};

module.exports = contactById;
