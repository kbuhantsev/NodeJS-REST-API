const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const current = async (req, res) => {
  const id = req.get("Authorization");

  const user = await User.findOne({ token: id });
  if (!user) {
    throw Unauthorized("Not authorized");
  }
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = current;
