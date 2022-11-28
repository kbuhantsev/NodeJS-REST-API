const { removeContact } = require("../../service/contacts");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { deletedCount } = await removeContact(contactId);
  if (deletedCount) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = deleteContact;
