const { User } = require("../../models/user");
const { NotFound, ServiceUnavailable, BadRequest } = require("http-errors");
const { metaSendEmail } = require("../../services");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("Email not found");
  } else if (user.verify) {
    throw BadRequest("Verification has already been passed");
  }

  const sended = await metaSendEmail({
    to: email,
    subject: "Account confirmation",
    html: `
    <div>
      <span>
        Hello ${user.name}! Please confirm your email by this link:
              <a href="${req.headers.origin}/goit-react-hw-08-phonebook/verify/${user.verificationToken}">${email}</a>
      </span>
    </div>
    `,
  });

  if (!sended) {
    throw ServiceUnavailable("Error with sending email!");
  }

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendEmail;
