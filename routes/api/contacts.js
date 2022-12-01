const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");

const {
  ctrlWrapper,
  validator,
  isValidId,
  auth,
} = require("../../middlewares");
const {
  addContactSchema,
  patchFavoriteSchema,
} = require("../../models/contact");

router
  .get("/", auth, ctrlWrapper(ctrl.allContacts)) //
  .post("/", auth, validator(addContactSchema), ctrlWrapper(ctrl.newContact));

router
  .get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.contactById))
  .delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.deleteContact))
  .put(
    "/:contactId",
    auth,
    isValidId,
    validator(addContactSchema),
    ctrlWrapper(ctrl.putContact)
  )
  .patch(
    "/:contactId/favorite",
    auth,
    isValidId,
    validator(patchFavoriteSchema),
    ctrlWrapper(ctrl.patchFavorite)
  );

module.exports = router;
