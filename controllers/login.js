const quires = require("../Models/User_quires");
const ApiError = require("../middlewares/error/ApiError");

const { create_AccessToken, create_RefreshToken } = require("../helpers/JWT");

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

  const Access_Token = await create_AccessToken(
    checkEmail.id,
    checkEmail.status
  );
  const Refresh_Token = await create_RefreshToken(
    checkEmail.id,
    checkEmail.status
  );

  res.json({
    status: true,
    actk: Access_Token,
    rftk: Refresh_Token,
    lvtk: checkEmail.LiveToken,
  });
};

module.exports = login;
