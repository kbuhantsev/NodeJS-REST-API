const { updateStatusContact } = require("../../service/contacts");

const { patchFavoriteSchema } = require("../../schemas");

const patchFavorite = async (req, res) => {
  const { value, error } = patchFavoriteSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }
  const { contactId } = req.params;
  const updatedContact = await updateStatusContact(contactId, value);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  patchFavorite,
};
