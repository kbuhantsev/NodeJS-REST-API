const { getContactById } = require("../../service/contacts");

const contactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = contactById;
