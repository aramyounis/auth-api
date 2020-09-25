const joi = require('joi');

//validate krdni aw zanyarianae user aineret la regay joi validation
const rigisterValidation = joi.object({
	email: joi.string().email().lowercase().required(),
	username: joi.string().min(3).required(),
	passowrd: joi.string().min(4).required(),
});

module.exports = {
	rigisterValidation,
};
