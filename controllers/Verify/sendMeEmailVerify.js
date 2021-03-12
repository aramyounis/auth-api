const ApiError = require("../../middlewares/error/ApiError");
const quires = require("../../Models/User_quires");
const { signEmailTokenToVerify } = require("../../helpers/jwt");
const { emailSendVerification } = require("../../helpers/sendEmail");

//bo nardne verificatione email agar linke peshtr basarchubu
const sendMeEmailVerify = async (req, res, next) => {
  try {
    const payload = req.payload;
    const verifyEmailToken = await signEmailTokenToVerify(
      payload.aud,
      payload.status
    );
    const userInfo = await quires.getuser.byID(payload.aud).then((user) => {
      return user;
    });
    if (userInfo.verify) {
      next(ApiError.badRequest("Your Account Verifed Don't Need This"));
      return;
    }
    //nardni emaile verification
    const checkEmailSend = await emailSendVerification(
      userInfo.email,
      verifyEmailToken
    );

    if (!checkEmailSend) {
      next(
        ApiError.badRequest("Email Verification Not Sended Please Tray Again")
      );
      return;
    }

    res.json({
      status: true,
      message:
        "Successfully Email Verification Send Check Your Email, This Link Working For 1hour!",
    });
  } catch (err) {
    console.log(err);
    next(ApiError.internalError("Something Went Worng!"));
  }
};

module.exports = sendMeEmailVerify;
