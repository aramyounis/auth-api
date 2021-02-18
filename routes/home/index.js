const express = require("express");
//drust krdni objectek la express router bo dyari krdni routekanman
const router = require("express-promise-router")();
const { verifyAccessToken } = require("../../helpers/jwt");
const isAccountActive = require("../../middlewares/isAccountActive");
const isEmailVerify = require("../../middlewares/isEmailVerify");
const homeController = require("../../controllers/home_controller");
const path = require("path");
router.get(
  "/",
  verifyAccessToken,
  isEmailVerify,
  isAccountActive,
  homeController
);

//export krdnaway routekanman
module.exports = router;
