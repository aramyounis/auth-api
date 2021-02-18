const quires = require("../../Models/User_quires");
const jwt = require("jsonwebtoken");
const path = require("path");

//bo verify krdni useraka la kate krdnawai emailakay w krdnawai linkaka
const forgetPassowrdPage = async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../../public/forgetPassowrdPage.html"));
  } catch (error) {
    next();
  }
};

module.exports = forgetPassowrdPage;
