const { sign } = require("jsonwebtoken");

//drutkrdni forget passowrd token
const create_ForgetPassToken = (id, status) => {
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
    sign(payload, secret, option, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
};

module.exports = create_ForgetPassToken;
