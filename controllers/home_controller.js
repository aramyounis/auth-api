const fs = require('fs');
const path = require('path');
const home = async (req, res, next) => {
	const data = fs.readFileSync(path.join('../onetwo_api/fileToSend/Active.html'), 'utf8');
	res.json({
		html: data,
	});
};

module.exports = home;
