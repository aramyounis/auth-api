const quires = require("../../Models/User_quires");
const ApiError = require("../../middlewares/error/ApiError");

//bo verify krdni useraka la kate krdnawai emailakay w krdnawai linkaka
const forgetPasswordAction = async (req, res, next) => {
  try {
    const payload = req.payload;
    const result = req.result;
    const forgetPassToken = req.forgetToken;
    console.log(result, payload);
    const checkUser = await quires.getuser
      .byID(payload.aud)
      .then(async (user) => {
        return user;
      });

    //dllnyabunawa ka useraka bune habet
    if (!checkUser) {
      next(ApiError.badRequest("Update Failed"));
      return;
    }
    if (checkUser.forgetPassToken !== forgetPassToken) {
      console.log(
        "User :" + checkUser.forgetPassToken,
        "Cookie" + forgetPassToken
      );
      next(ApiError.badRequest("Expired"));
      return;
    }
    // //gorene passowrdaka
    await quires
      .updatePasswordForget(payload.aud, result.newPassword)
      .then(async () => {
        res.clearCookie("fptk");
        res.json({ Message: "Passowrd Changed  Successfully" });
      })
      .catch((err) => {
        console.log(err);
        next(ApiError.badRequest("Update Failed"));
      });
  } catch (error) {
    console.log(error);
    next(ApiError.internalError());
  }
};

module.exports = forgetPasswordAction;
