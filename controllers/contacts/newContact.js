const { addContact } = require("../../service/contacts");

const { addContactSchema } = require("../../schemas");

const newContact = async (req, res) => {
  const { value, error } = addContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const contact = await addContact(value);
  if (contact) {
    res.json(contact);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = newContact;
