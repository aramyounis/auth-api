const { verify } = require("jsonwebtoken");
const ApiError = require("../error/ApiError");

//verifing krdni access token
const check_AccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    throw ApiError.authError("Unauthorized");
  }

  const token = req.headers["authorization"].split(" ")[1];
  console.log(req.headers["authorization"].split(" ")[1]);
  verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) {
      throw ApiError.authError("Unauthorized");
    }
    req.payload = payload;
    console.log(payload);
    next();
  });
};

module.exports = check_AccessToken;
