const joi = require('joi');

//validate krdni aw zanyarianae user aineret la regay joi validation
const reqDataRegister = async (req, res, next) => {
	const result = await joi
		.object({
			email: joi.string().email().lowercase().required(),
			username: joi.string().min(5).required(),
			passowrd: joi.string().min(6).required(),
		})
		.validateAsync(req.body);
	if (!result.error) {
		req.result = result;
		next();
	} else {
		res.send(result);
	}
};

//validate krdni aw zanyarianae user aineret la regay joi validation
const reqDataLogin = async (req, res, next) => {
	const result = await joi
		.object({
			email: joi.string().email().lowercase().required(),
			passowrd: joi.string().min(4).required(),
		})
		.validateAsync(req.body);
	if (!result.error) {
		req.result = result;
		next();
	} else {
		res.send(result);
	}
};
module.exports = {
	reqDataRegister,
	reqDataLogin,
};
