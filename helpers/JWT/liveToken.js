const { sign } = require("jsonwebtoken");

const create_LiveToken = (userID, status) => {
  return new Promise((resolve, reject) => {
    const payload = {
      status: status,
      expiresIn: "1h",
      issuer: "onetwo.com",
      audience: userID,
      Level: 1,
    };
    const secret = process.env.LIVE_TOKEN_SECRET;

    sign(payload, secret, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = create_LiveToken;
