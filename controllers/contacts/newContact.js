const { Contact } = require("../../models/contact");

const newContact = async (req, res) => {
  const user = req.user;
  const contact = await Contact.create({ ...req.body, owner: user._id });
  if (contact) {
    res.status(201).json(contact);
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = newContact;
