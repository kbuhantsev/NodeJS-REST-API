const { User } = require("../../models/user");
const { NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw NotFound("User not found");

  user.verificationToken = null;
  user.verify = true;

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1d" });
  user.token = token;

  await user.save();

  res.json({
    token: user.token,
    user: {
      name: user.name,
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = verify;
