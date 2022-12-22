const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { ctrlWrapper, validator, auth, upload } = require("../../middlewares");
const {
  loginUserSchema,
  addUserSchema,
  patchSubscriptionSchema,
  resendEmail,
} = require("../../models/user");

router
  .get("/logout", auth, ctrlWrapper(ctrl.logout))
  .get("/current", auth, ctrlWrapper(ctrl.current))
  .get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router
  .post("/signup", validator(addUserSchema), ctrlWrapper(ctrl.signup))
  .post("/login", validator(loginUserSchema), ctrlWrapper(ctrl.login))
  .post("/verify", validator(resendEmail), ctrlWrapper(ctrl.resendEmail));

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
