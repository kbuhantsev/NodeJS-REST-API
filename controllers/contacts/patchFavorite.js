const { Contact } = require("../../models/contact");
const { NotFound } = require("http-errors");

const patchFavorite = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = Contact.findByIdAndUpdate(
    contactId,
    { favorite: req.body.favorite },
    { new: true }
  );
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    throw NotFound("Not found");
  }
};

module.exports = patchFavorite;
