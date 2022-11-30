const { User } = require("../../models/user");

const logout = async (req, res) => {
  res.json({ message: "works" });
};

module.exports = logout;
