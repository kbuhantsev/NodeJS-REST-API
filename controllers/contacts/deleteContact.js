const { Contact } = require("../../models/contact");
const NotFound = require("http-errors");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { deletedCount } = await Contact.deleteOne({ _id: contactId });
  if (deletedCount) {
    res.json({ message: "contact deleted" });
  } else {
    throw NotFound(`Can not find contact with ID:${contactId}`);
  }
};

module.exports = deleteContact;
