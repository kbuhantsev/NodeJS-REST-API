const { allContacts } = require("./allContacts");
const { newContact } = require("./newContact");
const { contactById } = require("./contactById");
const { deleteContact } = require("./deleteContact");
const { putContact } = require("./putContact");
const { patchFavorite } = require("./patchFavorite");

module.exports = {
  allContacts,
  newContact,
  contactById,
  deleteContact,
  putContact,
  patchFavorite,
};
