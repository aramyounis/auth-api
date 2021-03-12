const express = require("express");
//drust krdni objectek la express router bo dyari krdni routekanman
const router = require("express-promise-router")();
const { check_AccessToken } = require("../../middlewares/JWT");
const isAccountActive = require("../../middlewares/isAccountActive");
const isEmailVerify = require("../../middlewares/isEmailVerify");
const { home_controller } = require("../../controllers");

router.get(
  "/",
  check_AccessToken,
  isEmailVerify,
  isAccountActive,
  home_controller
);

//export krdnaway routekanman
module.exports = router;
