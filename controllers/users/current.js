const { Unauthorized } = require("http-errors");

const current = async (req, res) => {
  if (!req.user) {
    throw Unauthorized("Missing User in request body!");
  }
  res.json(req.user);
};

module.exports = current;
