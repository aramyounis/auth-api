const quires = require('../Models/User_quires');
const isAccountActive = async (req, res, next) => {
	const { aud } = req.payload;
	const user = await quires.getuser.byID(aud).then((user) => {
		return user;
	});
	if (user.status) {
		req.status = user.status;
		next();
	} else {
		res.send('Account Not Actived');
	}
};
module.exports = isAccountActive;
