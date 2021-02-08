const quires = require("../Models/User_quires");
const fs = require("fs");
const path = require("path");
const isAccountActive = async (req, res, next) => {
  const { aud } = req.payload;
  const user = await quires.getuser.byID(aud).then((user) => {
    return user;
  });
  if (user.status) next();
  else {
    res.json({ Message: "Your Account Not Actived " });
  }
};
module.exports = isAccountActive;
