const { signAccessToken } = require("../helpers/jwt");
const refreshToken = async (req, res, next) => {
  const { aud, status } = req.payload;

  const accessToken = await signAccessToken(aud, status);
  res.json({
    accessToken: accessToken,
  });
};

module.exports = refreshToken;
