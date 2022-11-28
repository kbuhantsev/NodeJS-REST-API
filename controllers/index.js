const { allContacts } = require("./contacts/allContacts");
const { newContact } = require("./contacts/newContact");
const { contactById } = require("./contacts/contactById");
const { deleteContact } = require("./contacts/deleteContact");
const { putContact } = require("./contacts/putContact");
const { patchFavorite } = require("./contacts/patchFavorite");

module.exports = {
  allContacts,
  newContact,
  contactById,
  deleteContact,
  putContact,
  patchFavorite,
};
