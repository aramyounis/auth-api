const quires = require("../../Models/User_quires");

const sendLivePage = async (req, res, next) => {
  const payload = req.payload;
  // const user = await quires.getuser.byID(payload.aud).then((user) => {
  //   return user;
  // });
  res.json({
    Lv: payload.Lv,
  });
};

module.exports = sendLivePage;
