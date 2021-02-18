const crypto = require("crypto");

const firstKey = crypto.randomBytes(64).toString("hex");
const secondKey = crypto.randomBytes(64).toString("hex");
console.table({ firstKey, secondKey });
