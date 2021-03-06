const joi = require("joi");

//validate krdni aw zanyarianae user aineret la regay joi validation
const reqDataRegister = async (req, res, next) => {
  const result = await joi
    .object({
      email: joi.string().email().lowercase().required(),
      username: joi.string().min(3).required(),
      password: joi.string().min(4).required(),
    })
    .validateAsync(req.body);
  if (!result.error) {
    req.result = result;
    next();
  } else {
    res.send(result);
  }
};

module.exports = reqDataRegister;
