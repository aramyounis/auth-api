const quires = require("../../Models/User_quires");
const ApiError = require("../../middlewares/error/ApiError");
const jwt = require("jsonwebtoken");

//bo verify krdni useraka la kate krdnawai emailakay w krdnawai linkaka
const changePassowrdAction = async (req, res, next) => {
  try {
    const payload = req.payload;
    const result = req.result;

    console.log(result, payload);
    const checkUser = await quires.getuser
      .byID(payload.aud)
      .then(async (user) => {
        return user;
      });

    const checkPassword = await quires.validatePassword(
      checkUser.id,
      result.password
    );

    //dllnyabunawa ka useraka bune habet
    if (!checkUser) {
      next(ApiError.badRequest("Unauthorized"));
      return;
    }
    if (!checkPassword) {
      next(ApiError.badRequest("Check Your Information"));
      return;
    }

    // //gorene passowrdaka
    await quires
      .updatePassword(payload.aud, result.newPassword, result.newPassword)
      .then(async () => {
        res.json({ Message: "Passowrd Changed  Successfully" });
      })
      .catch((err) => {
        console.log(err);
        next(ApiError.badRequest("Unauthorized"));
      });
  } catch (error) {
    console.log(error);
    next(ApiError.internalError());
  }
};

module.exports = changePassowrdAction;
