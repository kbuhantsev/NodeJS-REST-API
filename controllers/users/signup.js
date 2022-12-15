const { User } = require("../../models/user");
const { Conflict, ServiceUnavailable } = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { metaSendEmail } = require("../../services");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw Conflict("Email in use");
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.setDefaultAvatar(email);
  newUser.verificationToken = uuidv4();
  await newUser.save();

  const sended = metaSendEmail({
    to: email,
    subject: "Account confirmation",
    html: `
    <div>
      <span>
        Hello! Please confirm your email by this link:
              <a href="${
                req.protocol +
                "//" +
                req.host +
                "/api/users/verify/" +
                newUser.verificationToken
              }">${email}</a>
      </span>
    </div>
    `,
  });

  if (!sended) {
    throw ServiceUnavailable("Error with sending email!");
  }

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
