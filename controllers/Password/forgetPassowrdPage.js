const path = require("path");
const quires = require("../../Models/User_quires");
//bo verify krdni useraka la kate krdnawai emailakay w krdnawai linkaka
const forgetPassowrdPage = async (req, res, next) => {
  try {
    const { forgetPassToken } = req.params;
    const { aud } = req.payload;
    const checkUser = await quires.getuser.byID(aud).then(async (user) => {
      return user;
    });
    if (checkUser.forgetPassToken !== forgetPassToken) {
      next();
    } else {
      res.cookie("fptk", `${forgetPassToken}`, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.sendFile(
        path.join(__dirname, "../../public/forgetPassowrdPage.html")
      );
    }
  } catch (error) {
    next();
  }
};

module.exports = forgetPassowrdPage;
