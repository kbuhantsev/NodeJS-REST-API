const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper, validator, isValidId } = require("../../middlewares");
const { addContactSchema, patchFavoriteSchema } = require("../../schemas");

router
  .get("/", ctrlWrapper(ctrl.allContacts)) //
  .post("/", validator(addContactSchema), ctrlWrapper(ctrl.newContact));

router
  .get("/:contactId", isValidId, ctrlWrapper(ctrl.contactById))
  .delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteContact))
  .put(
    "/:contactId",
    isValidId,
    validator(addContactSchema),
    ctrlWrapper(ctrl.putContact)
  )
  .patch(
    "/:contactId/favorite",
    isValidId,
    validator(patchFavoriteSchema),
    ctrlWrapper(ctrl.patchFavorite)
  );

module.exports = router;
