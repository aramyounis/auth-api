const ApiError = require("../../middlewares/error/ApiError");
const quires = require("../../Models/User_quires");
const { signForgetPassToken } = require("../../helpers/jwt");
const { emailSendForgetPassowrd } = require("../../helpers/sendEmail");

//bo nardne verificatione email agar linke peshtr basarchubu
const sendEmailForgetPass = async (req, res, next) => {
  try {
    const result = req.result;
    console.log(result);

    const userInfo = await quires.getuser.byEmail(result.email).then((user) => {
      return user;
    });
    if (!userInfo) {
      next(ApiError.badRequest("Fieled Please Check You Information"));
      return;
    }
    const forgetPassToken = await signForgetPassToken(
      userInfo.id,
      userInfo.status
    );
    console.log(forgetPassToken);
    const setToken = await quires
      .setForgetPassToken(userInfo.id, forgetPassToken)
      .then((user) => {
        return user;
      });
    if (!setToken) {
      next(ApiError.badRequest("Fieled Please Tray Again"));
      return;
    }
    //nardni emaile verification
    const checkEmailSend = await emailSendForgetPassowrd(
      userInfo.email,
      forgetPassToken
    );

    if (!checkEmailSend) {
      next(ApiError.badRequest("Fieled Please Tray Again"));
      return;
    }

    res.json({
      status: true,
      message:
        "Successfully Email Send Check Your Email, This Link Working For 1hour!",
    });
  } catch (err) {
    console.log(err);
    next(ApiError.internalError("Something Went Worng!"));
  }
};

module.exports = sendEmailForgetPass;
