const quires = require("../Models/User_quires");
const ApiError = require("../middlewares/error/ApiError");

const { create_VerifyToken } = require("../helpers/JWT");
const { emailSendVerification } = require("../helpers/sendEmail");

const register = async (req, res, next) => {
  //bo validate krdni datakane user aineret {email,username,password}
  const result = req.result;

  //bo dllnyabunawa la emaile ka peshtr bakar nahatbet
  const existsEmail = await quires.getuser
    .byEmail(result.email)
    .then((email) => {
      return email;
    });
  //bo dllnyabunawa la username ka peshtr bakar nahatbet
  const existsUsername = await quires.getuser
    .byUserName(result.username)
    .then((username) => {
      return username;
    });
  //garandnaway error agar emailaka peshtr tomar krabu
  if (existsEmail) throw ApiError.badRequest("The Email Aledy Used");

  //garandnaway error agar username peshtr tomar krabu
  if (existsUsername) throw ApiError.badRequest("Please Change Your Username");

  //tomar krdni useraka agar hich errorek nabu

  const userTokens = await quires
    .setUser(result.username, result.email, result.password)
    .then(async () => {
      const userInfo = await quires.getuser.byEmail(result.email);

      const verifyEmailToken = await create_VerifyToken(
        userInfo.id,
        userInfo.status
      );

      //nardni emaile verification
      await emailSendVerification(result.email, verifyEmailToken);

      return {
        status: true,
        message:
          "Successfuly Registered Check Your Email To Verify Your Account",
      };
    });

  res.json(userTokens);
};

module.exports = register;
