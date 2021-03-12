class ApiError {
  constructor(code, msg) {
    this.code = code;
    this.msg = msg;
  }
  static authError(msg) {
    return new ApiError(401, msg);
  }
  static badRequest(msg) {
    return new ApiError(400, msg);
  }
  static internalError(msg) {
    return new ApiError(500, msg);
  }
}

module.exports = ApiError;
