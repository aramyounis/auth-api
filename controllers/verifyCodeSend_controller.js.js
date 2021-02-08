const quires = require("../Models/User_quires");
const ApiError = require("../middlewares/error/ApiError");
const { signAccessToken, signRefreshToken } = require("../helpers/jwt");

const emailVerivication = async (req, res, next) => {};

module.exports = emailVerivication;
