//drust krdni objectek la express router bo dyari krdni routekanman
const router = require("express-promise-router")();

const {
  check_ForgetPassTokenParams,
  check_VerifyToken,
} = require("../../middlewares/JWT");

const { emailVerifyAction_controller } = require("../../controllers/Verify");

const { forgetPassowrdPage_controller } = require("../../controllers/Password");

//login buni user
//parametarakane {email,passowrd}

//la kate krdnawai linke krdnawai aw linkai  ba email bo user chwa am pageae bo akretawa ba pey tokenakai
//paramitarakae la regai query urlawa yat ka tokene forget passowrda
router.get("/", (req, res) => {
  res.send("ok");
});
router.get(
  "/forgetPassowrd/:forgetPassToken",
  check_ForgetPassTokenParams,
  forgetPassowrdPage_controller
);
router.get(
  "/verify/:verifyToken",
  check_VerifyToken,
  emailVerifyAction_controller
);

//export krdnaway routekanman
module.exports = router;
