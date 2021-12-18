const check_AccessToken = require("./accessToken");
const check_RefreshToken = require("./refreshToken");
const {
  check_ForgetPassToken,
  check_ForgetPassTokenParams,
} = require("./forgetPassToken");
const check_VerifyToken = require("./verifyToken");

module.exports = {
  check_AccessToken,
  check_RefreshToken,
  check_ForgetPassToken,
  check_ForgetPassTokenParams,
  check_VerifyToken,
};
