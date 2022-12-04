const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw Unauthorized("Email is wrong");
  }

  if (!user.validPassword(password)) {
    throw Unauthorized("Password is wrong");
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });

  user.token = token;
  user.save();

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
