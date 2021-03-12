const quires = require("../Models/User_quires");
const jwt = require("jsonwebtoken");
const getInformation = async (req, res, next) => {
  const payload = req.payload;
  console.log(payload);
  const user = await quires.getuser.byID(payload.aud).then((user) => {
    return user;
  });
  var dayYouHave = 0;
  const decoded = jwt.decode(user.LiveToken, process.env.LIVE_TOKEN_SECRET);
  createat = new Date(decoded.iat * 1000);
  expired = new Date(decoded.exp * 1000);
  var Difference_In_Time = expired.getTime() - createat.getTime();
  dayYouHave = Difference_In_Time / (1000 * 3600 * 24);

  res.json({
    dayYouHave: dayYouHave,
    userName: user.user_name,
    email: user.email,
    status: user.status,
    verify: user.verify,
  });
};

module.exports = getInformation;
