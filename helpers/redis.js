const redis = require("redis");
const { promisifyAll } = require("bluebird");

promisifyAll(redis);

module.exports = redis;
