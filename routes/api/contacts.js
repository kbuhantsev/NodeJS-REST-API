const express = require("express");
const router = express.Router();

const {
  allContacts,
  newContact,
  contactById,
  deleteContact,
  putContact,
  patchFavorite,
} = require("../../controller");

router
  .get("/", allContacts) //
  .post("/", newContact);

router
  .get("/:contactId", contactById)
  .delete("/:contactId", deleteContact)
  .patch("/:contactId/favorite", patchFavorite)
  .put("/:contactId", putContact);

module.exports = router;
