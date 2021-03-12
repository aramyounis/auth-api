const { sign } = require("jsonwebtoken");

//drustkrdni refresh token
const create_RefreshToken = (userID, status) => {
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
    sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = create_RefreshToken;
