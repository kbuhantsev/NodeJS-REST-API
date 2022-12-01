const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Unauthorized } = require("http-errors");

const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, _, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) throw new Unauthorized("Missing Bearer token");

  const token = bearerToken.split(" ")[1];
  try {
    const result = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(result.id, "email subscription");
    if (!user) {
      throw new Unauthorized(`User by id ${result.id} not found!`);
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
