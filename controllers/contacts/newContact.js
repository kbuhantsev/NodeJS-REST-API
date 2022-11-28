const { addContact } = require("../../service/contacts");

const newContact = async (req, res) => {
  const contact = await addContact(req.body);
  if (contact) {
    res.json(contact);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = newContact;
