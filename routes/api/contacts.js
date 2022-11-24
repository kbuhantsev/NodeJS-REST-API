const express = require("express");
const router = express.Router();

const {
  allContacts,
  newContact,
  contactById,
  deleteContact,
  putContact,
} = require("../../controllers");

router
  .get("/", allContacts) //
  .post("/", newContact);

router
  .get("/:contactId", contactById)
  .delete("/:contactId", deleteContact)
  .put("/:contactId", putContact);

module.exports = router;
