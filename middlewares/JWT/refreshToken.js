const { verify } = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

//check_ krdni refresh token
const check_RefreshToken = (req, res, next) => {
  if (!req.headers["authorization"]) throw ApiError.badRequest("Unauthorized");
  const token = req.headers["authorization"].split(" ")[1];
  verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
    if (err) throw ApiError.badRequest("Unauthorized");
    req.payload = payload;
    next();
  });
};

module.exports = check_RefreshToken;
