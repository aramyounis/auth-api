const path = require('path');
const home = async (req, res, next) => {
	res.sendFile(path.join(__dirname + '/file/active.html'));
};

module.exports = home;
