const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw Unauthorized("Email is wrong");
  }

  if (!user.validPassword(password)) {
    throw Unauthorized("Password is wrong");
  }
  res.json({
    token: "exampletoken",
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
