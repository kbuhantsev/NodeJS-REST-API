const express = require("express");
const router = express.Router();

const { users: ctrl } = require("../../controllers");

const { ctrlWrapper, validator } = require("../../middlewares");
const { addUserSchema } = require("../../models/user");

router
  .post("/signup", validator(addUserSchema), ctrlWrapper(ctrl.signup))
  .post("/login", validator(addUserSchema), ctrlWrapper(ctrl.login))
  .get("/logout", ctrlWrapper(ctrl.logout))
  .post("/current", ctrlWrapper(ctrl.current));

module.exports = router;
