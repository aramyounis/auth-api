const quires = require("../Models/User_quires");
const ApiError = require("../middlewares/error/ApiError");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt");

const login = async (req, res, next) => {
  const result = req.result;
  const checkEmail = await quires.getuser
    .byEmail(result.email)
    .then(async (user) => {
      return user;
    });

  if (!checkEmail) throw ApiError.badRequest(`Email or Password Invalid!`);

  const checkPassword = await quires.validatePassword(
    checkEmail.id,
    result.password
  );
  if (!checkPassword) throw ApiError.badRequest(`Email or password Invalid!`);
  const Access_Token = await signAccessToken(checkEmail.id, checkEmail.status);
  const Refresh_Token = await signRefreshToken(
    checkEmail.id,
    checkEmail.status
  );

  res.json({
    status: true,
    Access_Token,
    Refresh_Token,
    user: {
      UserName: checkEmail.user_name,
      Email: checkEmail.email,
      Verify: checkEmail.verify,
      status: checkEmail.status,
    },
  });
};

module.exports = login;
