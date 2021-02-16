//drust krdni objectek la express router bo dyari krdni routekanman
const router = require("express-promise-router")();

const {
  reqDataLogin,
  reqDataRegister,
} = require("../../middlewares/validateDataReq");

const register = require("../../controllers/register_controller");

const login = require("../../controllers/login_controller");

const {
  verifyAccessToken,
  verifyRefreshToken,
  verifyEmailTokenToVerify,
} = require("../../helpers/jwt");

const refreshToken = require("../../controllers/refreshToken_controller");

const quires = require("../../Models/User_quires");

const getInformation = require("../../controllers/getInformation_controller");

const setEmailVerification = require("../../controllers/setEmailVerification_controller");

const sendMeEmailVerification = require("../../controllers/sendMeEmailVerification_controller");

router.post("/login", reqDataLogin, login);

router.post("/register", reqDataRegister, register);
// router.post("/getVerifyCode", getVeifyCode);
// router.post("/forgetPassowrd");

router.post("/refresh_token", verifyRefreshToken, refreshToken);

router.post("/getInformation", verifyAccessToken, getInformation);

router.get(
  "/verify/:verifyToken",
  verifyEmailTokenToVerify,
  setEmailVerification
);

router.post("/sendMeEmail", verifyAccessToken, sendMeEmailVerification);
//export krdnaway routekanman
module.exports = router;
