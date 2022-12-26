const { User } = require("../../models/user");
const { Conflict, ServiceUnavailable } = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { metaSendEmail } = require("../../services");

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

  console.log(
    `${req.headers.origin}/goit-react-hw-08-phonebook/verify/${newUser.verificationToken}`
  );

  const result = await metaSendEmail({
    to: email,
    subject: "Account confirmation",
    html: `
    <div>
      <span>
        Hello ${name}! Please confirm your email by this link:
              <a href="${req.headers.origin}/goit-react-hw-08-phonebook/verify/${newUser.verificationToken}">${email}</a>
      </span>
    </div>
    `,
  });

  if (result === null) {
    throw ServiceUnavailable("Error with sending email service!");
  } else if (result.rejected.length) {
    throw ServiceUnavailable(result.responce);
  }

  await newUser.save();

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = signup;
