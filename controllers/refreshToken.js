const { create_AccessToken, create_RefreshToken } = require("../helpers/JWT");
const quires = require("../Models/User_quires");

const refreshToken = async (req, res, next) => {
  const { aud, status } = req.payload;

  const accessToken = await create_AccessToken(aud, status);
  const Refresh_Token = await create_RefreshToken(aud, status);
  const checkUser = await quires.getuser.byID(aud).then(async (user) => {
    return user;
  });

  res.json({
    actk: accessToken,
    rftk: Refresh_Token,
    lvtk: checkUser.LiveToken,
  });
};

module.exports = refreshToken;
