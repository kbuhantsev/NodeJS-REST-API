const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const subscription = async (req, res) => {
  const id = req.get("Authorization");
  const user = await User.findByIdAndUpdate(
    id,
    { subscription: req.body.subscription },
    { new: true }
  );

  if (!user) {
    throw NotFound("Not found");
  }
  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = subscription;
