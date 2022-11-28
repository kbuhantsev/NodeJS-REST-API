const { BadRequest } = require("http-errors");

const validator = (schema) => {
  return async (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(BadRequest(error.message));
    } else {
      next();
    }
  };
};

module.exports = validator;
