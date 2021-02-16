const quires = require("../Models/User_quires");
const ApiError = require("../middlewares/error/ApiError");
const jwt = require("jsonwebtoken");

//bo verify krdni useraka la kate krdnawai emailakay w krdnawai linkaka
const setEmailVerification = async (req, res, next) => {
  try {
    const payload = req.payload;
    const checkUser = await quires.getuser
      .byID(payload.aud)
      .then(async (user) => {
        return user;
      });
    //dllnyabunawa ka useraka bune habet
    if (!checkUser) {
      next(ApiError.badRequest("Unauthorized"));
      return;
    }
    //dllnyabunawa lawai accountaka verify nakrawa peshtr
    else if (checkUser.verify) {
      res.json({ Message: "Your Already Verify" });
      return;
    }

    //agar verify nakrabu awa verify akret
    await quires
      .updateVerifyEmail(payload.aud)
      .then(async () => {
        res.json({ Message: "Verification Successfully" });
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

module.exports = setEmailVerification;
