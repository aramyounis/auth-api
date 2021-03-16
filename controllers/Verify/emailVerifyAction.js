const quires = require("../../Models/User_quires");
const path = require("path");
const { create_LiveToken } = require("../../helpers/jwt");

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
    const LiveToken = await create_LiveToken(payload.aud, 3);
    console.log(LiveToken);
    //agar verify nakrabu awa verify akret
    await quires
      .updateVerifyEmail(payload.aud, LiveToken)
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
