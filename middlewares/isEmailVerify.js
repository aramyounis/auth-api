const quires = require("../Models/User_quires");
const fs = require("fs");
const path = require("path");
const isEmailVerify = async (req, res, next) => {
  const { aud } = req.payload;

  const user = await quires.getuser.byID(aud).then((user) => {
    return user;
  });
  if (user.verify) {
    req.verify = user.verify;
    next();
  } else {
    res.json({ Message: "Please Verify your Email" });
  }
};

module.exports = isEmailVerify;
