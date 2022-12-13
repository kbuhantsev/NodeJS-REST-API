const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw NotFound("User not found");

  user.verificationToken = null;
  user.verify = true;
  await user.save();

  res.json({
    message: "Verification successful",
  });
};

module.exports = verify;
