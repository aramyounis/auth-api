const express = require('express');
//drust krdni objectek la express router bo dyari krdni routekanman
const router = require('express-promise-router')();
const { reqDataLogin, reqDataRegister } = require('../../middlewares/validateDataReq');
const register = require('../../controllers/register_controller');
const login = require('../../controllers/login_controller');
const refreshToken = require('../../controllers/refreshToken_controller');

router.post('/login', reqDataLogin, login);

router.post('/register', reqDataRegister, register);

router.post('/refresh_token', refreshToken);

//export krdnaway routekanman
module.exports = router;
