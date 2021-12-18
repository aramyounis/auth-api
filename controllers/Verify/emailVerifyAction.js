const quires = require("../../Models/User_quires");
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
    //dllnyabunawa lawai accountaka verify nakrawa peshtr
    if (checkUser.verify) {
      next();
      return;
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
        next();
        return;
      });
  } catch (error) {
    console.log(error);
    next();
    return;
  }
};

module.exports = setEmailVerification;
