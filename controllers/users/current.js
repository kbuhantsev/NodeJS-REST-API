const { User } = require("../../models/user");

const current = async (req, res) => {
  res.json({ message: "works" });
};

module.exports = current;
