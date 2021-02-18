const quires = require("../Models/User_quires");

const getInformation = async (req, res, next) => {
  const payload = req.payload;
  const user = await quires.getuser.byID(payload.audience).then((user) => {
    return user;
  });
  res.json({
    userName: user.user_name,
    email: user.email,
    status: user.status,
    verify: user.verify,
  });
};

module.exports = getInformation;
