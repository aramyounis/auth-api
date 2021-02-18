//drust krdni objectek la express router bo dyari krdni routekanman
const router = require("express-promise-router")();

const {
  verifyForgetPassTokenParams,

  verifyEmailTokenToVerify,
} = require("../../helpers/jwt");

const setEmailVerification = require("../../controllers/Verify_Controller/setEmailVerification");

const forgetPassowrdPage = require("../../controllers/Password_Controller/forgetPassowrdPage");

//login buni user
//parametarakane {email,passowrd}

//la kate krdnawai linke krdnawai aw linkai  ba email bo user chwa am pageae bo akretawa ba pey tokenakai
//paramitarakae la regai query urlawa yat ka tokene forget passowrda
router.get(
  "/forgetPassowrd/:forgetPassToken",
  verifyForgetPassTokenParams,
  forgetPassowrdPage
);

router.get(
  "/verify/:verifyToken",
  verifyEmailTokenToVerify,
  setEmailVerification
);

//export krdnaway routekanman
module.exports = router;
