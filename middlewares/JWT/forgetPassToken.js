const { verify } = require("jsonwebtoken");
const ApiError = require("../error/ApiError");
const path = require("path");

//check_ krdni forget passowrd token
const check_ForgetPassTokenParams = (req, res, next) => {
  const { forgetPassToken } = req.params;
  console.log(forgetPassToken);
  if (!forgetPassToken) {
    res.sendFile(path.join(__dirname, "../public/errorPage.html"));
  } else {
    verify(forgetPassToken, process.env.FORGET_PASS_SECRET, (err, payload) => {
      if (err) {
        res.sendFile(path.join(__dirname, "../public/errorPage.html"));
      } else {
        req.payload = payload;
        next();
      }
    });
  }
};
//check_ krdni forget passowrd token
const check_ForgetPassToken = (req, res, next) => {
  const tokenForgetPass = req.cookies.fptk;
  if (!tokenForgetPass) throw ApiError.authError("Update Failed");
  verify(tokenForgetPass, process.env.FORGET_PASS_SECRET, (err, payload) => {
    if (err) throw ApiError.authError("Update Failed");
    req.payload = payload;
    req.forgetToken = tokenForgetPass;
    next();
  });
};

module.exports = {
  check_ForgetPassTokenParams,
  check_ForgetPassToken,
};
