const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { ctrlWrapper, validator } = require("../../middlewares");
const { addUserSchema, patchSubscriptionSchema } = require("../../models/user");

router
  .get("/logout", ctrlWrapper(ctrl.logout))
  .get("/current", ctrlWrapper(ctrl.current));

router
  .post("/signup", validator(addUserSchema), ctrlWrapper(ctrl.signup))
  .post("/login", validator(addUserSchema), ctrlWrapper(ctrl.login));

router.patch(
  "/",
  validator(patchSubscriptionSchema),
  ctrlWrapper(ctrl.subscription)
);

module.exports = router;
