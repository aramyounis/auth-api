//drust krdni objectek la express router bo dyari krdni routekanman
const router = require("express-promise-router")();
const {
  reqDataLogin,
  reqDataRegister,
  reqDataSendEmail,
  reqDataForgetPassowrd,
} = require("../../middlewares/validateDataReq");

const register = require("../../controllers/register_controller");

const login = require("../../controllers/login_controller");

const {
  verifyAccessToken,
  verifyRefreshToken,
  verifyForgetPassToken,
} = require("../../helpers/jwt");

const refreshToken = require("../../controllers/refreshToken_controller");

const getInformation = require("../../controllers/getInformation_controller");

const sendMeEmailVerification = require("../../controllers/Verify_Controller/sendMeEmailVerification");

const sendEmailForgetPass = require("../../controllers/Password_Controller/sendEmailForgetPassowrd");
const changePassowrdAction = require("../../controllers/Password_Controller/changePassowrdAction");

//login buni user
//parametarakane {email,passowrd}

router.post("/login", reqDataLogin, login);

//register buni user
//parametarakane {email,name,passowrd}
router.post("/register", reqDataRegister, register);
// router.post("/getVerifyCode", getVeifyCode);

//nardni emaile bo user bo away passowrdakae nwekatawa
//parametarakane {email}
router.post("/emailforgetPassowrd", reqDataSendEmail, sendEmailForgetPass);

//la kate krdnawai linke krdnawai aw linkai  ba email bo user chwa am pageae bo akretawa ba pey tokenakai
//paramitarakae la regai query urlawa yat ka tokene forget passowrda

// la dwai krdnawai aw linkae ba email boy roishtwa passowrda tazakan daxl akatw click la change akat bo gorene passowrdaka request yat bo am pasha
router.post(
  "/resetPassowrd",
  reqDataForgetPassowrd,
  verifyForgetPassToken,
  changePassowrdAction
);

router.post("/refresh_token", verifyRefreshToken, refreshToken);

router.post("/getInformation", verifyAccessToken, getInformation);

router.post("/emailVerify", verifyAccessToken, sendMeEmailVerification);
//export krdnaway routekanman
module.exports = router;
