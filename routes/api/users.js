const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { ctrlWrapper, validator } = require("../../middlewares");
const { addUserSchema } = require("../../models/user");

router
  .get("/logout", ctrlWrapper(ctrl.logout))
  .get("/current", ctrlWrapper(ctrl.current));

router
  .post("/signup", validator(addUserSchema), ctrlWrapper(ctrl.signup))
  .post("/login", validator(addUserSchema), ctrlWrapper(ctrl.login));

module.exports = router;
