const { updateStatusContact } = require("../../service/contacts");

const patchFavorite = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(contactId, req.body);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = patchFavorite;
