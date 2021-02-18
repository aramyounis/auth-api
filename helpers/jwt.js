const jwt = require("jsonwebtoken");
const ApiError = require("../middlewares/error/ApiError");
const path = require("path");
module.exports = {
  //drust krdni access token
  signAccessToken: (userID, status) => {
    return new Promise((resolve, reject) => {
      const payload = {
        status: status,
        expiresIn: "1h",
        issuer: "onetwo.com",
        audience: userID,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;

      jwt.sign(payload, secret, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
  //verify krdni access token
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) {
      throw ApiError.badRequest("Unauthorized");
    }

    const token = req.headers["authorization"].split(" ")[1];
    console.log(req.headers["authorization"].split(" ")[1]);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        throw ApiError.badRequest("Unauthorized");
      }
      req.payload = payload;
      console.log(payload);
      next();
    });
  },

  //drustkrdni refresh token
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

  //verify krdni refresh token
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

  //drust krdni email verify token
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

  //verify krdni email token
  verifyEmailTokenToVerify(req, res, next) {
    const { verifyToken } = req.params;
    console.log(verifyToken);
    if (!verifyToken) {
      res.sendFile(path.join(__dirname, "../public/errorPage.html"));
    }

    jwt.verify(verifyToken, process.env.EMAIL_VERIFY_SECRET, (err, payload) => {
      if (err) {
        res.sendFile(path.join(__dirname, "../public/errorPage.html"));
      } else {
        req.payload = payload;
        next();
      }
    });
  },

  //drutkrdni forget passowrd token
  signForgetPassToken: (id, status) => {
    return new Promise((resolve, reject) => {
      const payload = {
        status: status,
      };
      const secret = process.env.FORGET_PASS_SECRET;

      const option = {
        expiresIn: "1h",
        issuer: "onetwo.com",
        audience: id,
      };
      jwt.sign(payload, secret, option, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },

  //verify krdni forget passowrd token
  verifyForgetPassTokenParams(req, res, next) {
    const { forgetPassToken } = req.params;
    console.log(forgetPassToken);
    if (!forgetPassToken) {
      res.sendFile(path.join(__dirname, "../public/errorPage.html"));
    } else {
      jwt.verify(
        forgetPassToken,
        process.env.FORGET_PASS_SECRET,
        (err, payload) => {
          if (err) {
            res.sendFile(path.join(__dirname, "../public/errorPage.html"));
          } else {
            req.payload = payload;
            next();
          }
        }
      );
    }
  },
  //verify krdni forget passowrd token
  verifyForgetPassToken(req, res, next) {
    if (!req.headers["authorization"])
      throw ApiError.badRequest("Unauthorized");
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.FORGET_PASS_SECRET, (err, payload) => {
      if (err) throw ApiError.badRequest("Unauthorized");
      req.payload = payload;
      next();
    });
  },
};
