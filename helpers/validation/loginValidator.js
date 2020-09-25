const joi = require('joi');

//validate krdni aw zanyarianae user aineret la regay joi validation
const loginValidation = joi.object({
	email: joi.string().email().lowercase().required(),
	passowrd: joi.string().min(4).required(),
});

module.exports = {
	loginValidation,
};
