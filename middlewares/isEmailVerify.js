const quires = require('../Models/User_quires');
const isEmailVerify = async (req, res, next) => {
	const { aud } = req.payload;

	const user = await quires.getuser.byID(aud).then((user) => {
		return user;
	});
	if (user.verify) {
		req.verify = user.verify;
		next();
	} else {
		res.send('Email Not Verify');
	}
};

module.exports = isEmailVerify;
