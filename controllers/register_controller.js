const { rigisterValidation } = require('../helpers/validation/registerValid');
const quires = require('../Models/User_quires');
const ApiError = require('../middlewares/error/ApiError');
const { signAccessToken, signRefreshToken } = require('../helpers/jwt');

const register = async (req, res, next) => {
	//bo validate krdni datakane user aineret {email,username,passowrd}
	const result = await rigisterValidation.validateAsync(req.body);

	//bo dllnyabunawa la emaile ka peshtr bakar nahatbet
	const existsEmail = await quires.getuser.byEmail(result.email).then((email) => {
		return email;
	});
	//bo dllnyabunawa la username ka peshtr bakar nahatbet
	const existsUsername = await quires.getuser.byUserName(result.username).then((username) => {
		return username;
	});
	//garandnaway error agar emailaka peshtr tomar krabu
	if (existsEmail) throw ApiError.badRequest('The Email Aledy Used');

	//garandnaway error agar username peshtr tomar krabu
	if (existsUsername) throw ApiError.badRequest('Please Change You Username');

	//tomar krdni useraka agar hich errorek nabu
	const userTokens = await quires.setuser(result.username, result.email, result.passowrd).then(async () => {
		return await quires.getuser.byEmail(result.email).then(async (user) => {
			const Refresh_Token = await signRefreshToken(user.id);
			const Access_Token = await signAccessToken(user.id, user.status);
			return { Access_Token, Refresh_Token };
		});
	});
	res.send(userTokens);
};

module.exports = register;
