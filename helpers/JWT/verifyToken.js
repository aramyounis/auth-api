const { sign } = require("jsonwebtoken");

const create_VerifyToken = (userID, status) => {
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
    sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = create_VerifyToken;
