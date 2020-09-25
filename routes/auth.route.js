const express = require('express');
//drust krdni objectek la express router bo dyari krdni routekanman
const router = require('express-promise-router')();
const register = require('../controllers/register_controller');
const login = require('../controllers/login_controller');
const refreshToken = require('../controllers/refreshToken_controller');

router.post('/login', login);

router.post('/register', register);

router.post('/refresh_token', refreshToken);

router.delete('/logout', async (req, res, next) => {
	res.send('logout Router');
});
router.get('/users', (req, res, next) => {
	quires.user.getAll().then((users) => {
		res.send(users);
	});
});

//export krdnaway routekanman
module.exports = router;
