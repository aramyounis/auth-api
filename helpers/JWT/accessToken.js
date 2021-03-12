const { sign } = require("jsonwebtoken");

const create_AccessToken = (userID, status) => {
  return new Promise((resolve, reject) => {
    const payload = {
      status: status,
    };
    const option = {
      expiresIn: "3m",
      issuer: "onetwo.com",
      audience: userID,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;

    sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = create_AccessToken;
