const { updateContact } = require("../../service/contacts");

const { updateContactSchema } = require("../../schemas");

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

module.exports = {
  putContact,
};
