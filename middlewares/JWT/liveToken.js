const { verify } = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

//check_ krdni access token
const check_LiveToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    throw ApiError.authError("Unauthorized");
  }

  const token = req.headers["authorization"].split(" ")[1];
  console.log(req.headers["authorization"].split(" ")[1]);
  verify(token, process.env.LIVE_TOKEN_SECRET, (err, payload) => {
    if (err) {
      throw ApiError.authError("Unauthorized");
    }
    req.payload = payload;
    console.log(payload);
    next();
  });
};

module.exports = check_LiveToken;
