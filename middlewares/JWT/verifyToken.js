const { verify } = require("jsonwebtoken");
const path = require("path");

//verify krdni email token
const check_VerifyToken = (req, res, next) => {
  const { verifyToken } = req.params;
  console.log(verifyToken);
  if (!verifyToken) {
    res.sendFile(path.join(__dirname, "../public/errorPage.html"));
  }

  verify(verifyToken, process.env.EMAIL_VERIFY_SECRET, (err, payload) => {
    if (err) {
      res.sendFile(path.join(__dirname, "../public/errorPage.html"));
    } else {
      req.payload = payload;
      next();
    }
  });
};

module.exports = check_VerifyToken;
