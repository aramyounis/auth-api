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
	} else {
		const data = `<div class="container mt-5"><form id="login"><div class="form-group mt-5"><label for="inputVerifyEmail">Verify Code</label><input type="VerifyEmail" class="form-control" id="inputVerifyEmail" aria-describedby="VerifyEmailHelp" /><smallid="VerifyEmailHelp"class="form-text text-muted">We'll never share your email with anyone else.</small></div><button type="submit" class="btn btn-primary">Verify</button><a class="link" href="/register.html">Send Email Verify</a></form></div>`;

		res.json(data);
	}
};

module.exports = isEmailVerify;
