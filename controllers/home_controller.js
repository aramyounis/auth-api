const home = async (req, res, next) => {
	const active = req.payload.status;
	if (active) res.send('active');
	else {
		res.send('Not active');
	}
};

module.exports = home;
