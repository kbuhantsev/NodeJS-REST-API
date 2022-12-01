const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const logout = async (req, res) => {
  if (!req.user) {
    throw Unauthorized("Missing User in reques body!");
  }

  const userId = req.user._id;
  const user = await User.findByIdAndUpdate(userId, { token: null });
  if (!user) {
    throw new Unauthorized(`User by id ${userId} not found!`);
  }

  res.status(204).send();
};

module.exports = logout;
