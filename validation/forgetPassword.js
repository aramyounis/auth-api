const joi = require("joi");

const forgetPassowrd = async (req, res, next) => {
  const result = await joi
    .object({
      newPassword: joi.string().min(5).required(),
    })
    .validateAsync(req.body);
  if (!result.error) {
    req.result = result;
    next();
  } else {
    res.send(result);
  }
};

module.exports = forgetPassowrd;
