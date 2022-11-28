const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper, validator } = require("../../middlewares");
const {
  addContactSchema,
  patchFavoriteSchema,
  updateContactSchema,
} = require("../../schemas");

router
  .get("/", ctrlWrapper(ctrl.allContacts)) //
  .post("/", validator(addContactSchema), ctrlWrapper(ctrl.newContact));

router
  .get("/:contactId", ctrlWrapper(ctrl.contactById))
  .delete("/:contactId", ctrlWrapper(ctrl.deleteContact))
  .patch(
    "/:contactId/favorite",
    validator(patchFavoriteSchema),
    ctrlWrapper(ctrl.patchFavorite)
  )
  .put(
    "/:contactId",
    validator(updateContactSchema),
    ctrlWrapper(ctrl.putContact)
  );

module.exports = router;
