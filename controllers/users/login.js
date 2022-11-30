const { User } = require("../../models/user");

const login = async (req, res) => {
  res.json({ message: "works" });
};

module.exports = login;
