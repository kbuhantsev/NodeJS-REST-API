const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const qs = require("qs");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

app.set("query parser", function (str) {
  return qs.parse(str, { ignoreQueryPrefix: true });
});

const formatsLogger = app.get("env") === process.env.NODE_ENV ? "dev" : "short";
app.use(logger(formatsLogger));

app.use(cors());
app.use(express.json());
app.use("/avatars", express.static("public/avatars"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found!" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "internal server error!" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
