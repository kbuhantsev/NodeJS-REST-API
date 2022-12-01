const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const contactById = async (req, res) => {
  const user = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findById(
    contactId,
    "name email phone favorite",
    { owner: user._id }
  );
  if (contact) {
    res.json(contact);
  } else {
    throw NotFound(`Can not find contact with ID:${contactId}`);
  }
};

module.exports = contactById;
