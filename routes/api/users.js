const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { ctrlWrapper, validator, auth, upload } = require("../../middlewares");
const { addUserSchema, patchSubscriptionSchema } = require("../../models/user");

router
  .get("/logout", auth, ctrlWrapper(ctrl.logout))
  .get("/current", auth, ctrlWrapper(ctrl.current));

router
  .post("/signup", validator(addUserSchema), ctrlWrapper(ctrl.signup))
  .post("/login", validator(addUserSchema), ctrlWrapper(ctrl.login));

router
  .patch(
    "/",
    auth,
    validator(patchSubscriptionSchema),
    ctrlWrapper(ctrl.subscription)
  )
  .patch(
    "/avatars",
    auth,
    upload.single("avatar"),
    ctrlWrapper(ctrl.updateAvatar)
  );

module.exports = router;
