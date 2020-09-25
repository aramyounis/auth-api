const express = require('express');
//drust krdni objectek la express router bo dyari krdni routekanman
const router = require('express-promise-router')();
const { verifyAccessToken } = require('../helpers/jwt');
const homeController = require('../controllers/home_controller');

router.get('/', verifyAccessToken, homeController);

//export krdnaway routekanman
module.exports = router;
