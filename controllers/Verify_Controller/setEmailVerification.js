const quires = require("../../Models/User_quires");
const ApiError = require("../../middlewares/error/ApiError");
const jwt = require("jsonwebtoken");
const path = require("path");

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
      res.sendFile(path.join(__dirname, "../../public/errorPage.html"));
    }
    //dllnyabunawa lawai accountaka verify nakrawa peshtr
    else if (checkUser.verify) {
      res.sendFile(path.join(__dirname, "../../public/errorPage.html"));
    }

    //agar verify nakrabu awa verify akret
    await quires
      .updateVerifyEmail(payload.aud)
      .then(async () => {
        res.sendFile(
          path.join(__dirname, "../../public/verificationSuccessPage.html")
        );
      })
      .catch((err) => {
        console.log(err);
        res.sendFile(path.join(__dirname, "../../public/errorPage.html"));
      });
  } catch (error) {
    console.log(error);
    res.sendFile(path.join(__dirname, "../../public/errorPage.html"));
  }
};

module.exports = setEmailVerification;
