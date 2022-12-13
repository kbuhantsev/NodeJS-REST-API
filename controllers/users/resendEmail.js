const { User } = require("../../models/user");
const { NotFound, ServiceUnavailable, BadRequest } = require("http-errors");
const { metaSendEmail } = require("../../helpers");

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
        Hello! Please confirm your email by this link:
              <a href="${
                req.protocol +
                "//" +
                req.host +
                "/api/users/verify/" +
                user.verificationToken
              }">${email}</a>
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
