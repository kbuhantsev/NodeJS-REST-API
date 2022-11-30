const { User } = require("../../models/user");
const { Conflict } = require("http-errors");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw Conflict("Email in use");
  }
  const newUser = await User.create({ email, password });
  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

module.exports = signup;
