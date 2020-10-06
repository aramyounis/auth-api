const fs = require('fs');
const path = require('path');
const home = async (req, res, next) => {
	const page = fs.readFileSync(path.join('../onetwo_api/fileToSend/Active.html'), 'utf8');
	res.json({
		html: page,
	});
};

module.exports = home;
