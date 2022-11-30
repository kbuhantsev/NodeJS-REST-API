const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const logout = async (req, res) => {
  const id = req.get("Authorization");
  const user = await User.findByIdAndUpdate(id, { token: null }, { new: true });
  if (!user) {
    throw Unauthorized("Not authorized");
  }
  res.status(204).send();
};

module.exports = logout;
