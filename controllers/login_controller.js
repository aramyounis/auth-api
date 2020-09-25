const { loginValidation } = require('../helpers/validation/loginValidator');
const quires = require('../Models/User_quires');
const ApiError = require('../middlewares/error/ApiError');
const { signAccessToken, signRefreshToken } = require('../helpers/jwt');

const login = async (req, res, next) => {
	const result = await loginValidation.validateAsync(req.body);

	const checkEmail = await quires.getuser.byEmail(result.email).then(async (user) => {
		return user;
	});

	if (!checkEmail) throw ApiError.badRequest(`Email or Passowrd Invalid!`);

	const checkPassowrd = await quires.validatePassowrd(result.email, result.passowrd);
	if (!checkPassowrd) throw ApiError.badRequest(`Email or Passowrd Invalid!`);

	const Access_Token = await signAccessToken(checkEmail.id, checkEmail.status);
	const Refresh_Token = await signRefreshToken(checkEmail.id);
	res.send({ Access_Token, Refresh_Token });
};

module.exports = login;
