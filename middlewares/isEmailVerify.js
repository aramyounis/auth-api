const quires = require('../Models/User_quires');
const fs = require('fs');
const path = require('path');
const isEmailVerify = async (req, res, next) => {
	const { aud } = req.payload;

	const user = await quires.getuser.byID(aud).then((user) => {
		return user;
	});
	if (user.verify) {
		req.verify = user.verify;
		next();
	}
	const data = await fs.readFileSync(path.join('../onetwo_api/fileToSend/noEmailVerify.html'), 'utf8');
	res.json({ data });
};

module.exports = isEmailVerify;
