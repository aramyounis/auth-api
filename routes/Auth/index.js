//drust krdni objectek la express router bo dyari krdni routekanman
const router = require("express-promise-router")();

//validations
const {
  login_ValidationData,
  forgetPassword_ValidationData,
  register_ValidationData,
  sendEmail_ValidationData,
} = require("../../validation");

//controllers
const {
  login_controller,
  register_controller,
  refreshToken_controller,
  getInformation_controller,
} = require("../../controllers");

const {
  forgetPasswordAction_controller,
  sendEmailForgetPassowrd_controller,
} = require("../../controllers/Password");

const { sendMeEmailVerify_controller } = require("../../controllers/Verify");

//midelwares

const {
  check_AccessToken,
  check_RefreshToken,
  check_ForgetPassToken,
} = require("../../middlewares/JWT");

//login buni user
//parametarakane {email,passowrd}

router.post("/login", login_ValidationData, login_controller);

//register buni user
//parametarakane {email,name,passowrd}
router.post("/register", register_ValidationData, register_controller);
// router.post("/getVerifyCode", getVeifyCode);

//nardni emaile bo user bo away passowrdakae nwekatawa
//parametarakane {email}
router.post(
  "/emailforgetPassowrd",
  sendEmail_ValidationData,
  sendEmailForgetPassowrd_controller
);

//la kate krdnawai linke krdnawai aw linkai  ba email bo user chwa am pageae bo akretawa ba pey tokenakai
//paramitarakae la regai query urlawa yat ka tokene forget passowrda

// la dwai krdnawai aw linkae ba email boy roishtwa passowrda tazakan daxl akatw click la change akat bo gorene passowrdaka request yat bo am pasha
router.post(
  "/resetPassowrd",
  forgetPassword_ValidationData,
  check_ForgetPassToken,
  forgetPasswordAction_controller
);

router.post("/refresh_token", check_RefreshToken, refreshToken_controller);

router.post("/getInformation", check_AccessToken, getInformation_controller);

router.post("/emailVerify", check_AccessToken, sendMeEmailVerify_controller);

//export krdnaway routekanman
module.exports = router;
