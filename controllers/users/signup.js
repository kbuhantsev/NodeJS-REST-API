const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw Conflict("Email in use");
  }

  const newUser = new User({ name, email });
  newUser.setPassword(password);
  newUser.setDefaultAvatar(email);
  newUser.verificationToken = uuidv4();

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "1d" });
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    token: newUser.token,
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = signup;
