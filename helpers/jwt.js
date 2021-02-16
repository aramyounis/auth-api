const jwt = require("jsonwebtoken");
const ApiError = require("../middlewares/error/ApiError");

module.exports = {
  signAccessToken: (userID, status) => {
    return new Promise((resolve, reject) => {
      const payload = {
        status: status,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;

      const option = {
        expiresIn: "1h",
        issuer: "onetwo.com",
        audience: userID,
      };
      jwt.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"])
      throw ApiError.badRequest("Unauthorized");
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) throw ApiError.badRequest("Unauthorized");
      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userID, status) => {
    return new Promise((resolve, reject) => {
      const payload = {
        status: status,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;

      const option = {
        expiresIn: "7d",
        issuer: "onetwo.com",
        audience: userID,
      };
      jwt.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  verifyRefreshToken(req, res, next) {
    if (!req.headers["authorization"])
      throw ApiError.badRequest("Unauthorized");
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
      if (err) throw ApiError.badRequest("Unauthorized");
      req.payload = payload;
      next();
    });
  },
  signEmailTokenToVerify: (userID, status) => {
    return new Promise((resolve, reject) => {
      const payload = {
        status: status,
      };
      const secret = process.env.EMAIL_VERIFY_SECRET;

      const option = {
        expiresIn: "1h",
        issuer: "onetwo.com",
        audience: userID,
      };
      jwt.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  verifyEmailTokenToVerify(req, res, next) {
    const { verifyToken } = req.params;
    console.log(verifyToken);
    if (!verifyToken) throw ApiError.badRequest("Unauthorized");
    jwt.verify(verifyToken, process.env.EMAIL_VERIFY_SECRET, (err, payload) => {
      if (err) throw ApiError.badRequest("Unauthorized");
      req.payload = payload;
      next();
    });
  },
};
