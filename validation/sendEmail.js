const joi = require("joi");

const sendEmail = async (req, res, next) => {
  const result = await joi
    .object({
      email: joi.string().email().lowercase().required(),
    })
    .validateAsync(req.body);
  if (!result.error) {
    req.result = result;
    next();
  } else {
    res.send(result);
  }
};

module.exports = sendEmail;
