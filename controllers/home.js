const fs = require("fs");
const path = require("path");
const home = async (req, res, next) => {
  res.json({
    Message: "Your Account Activated",
  });
};

module.exports = home;
