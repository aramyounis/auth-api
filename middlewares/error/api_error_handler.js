const ApiError = require("./ApiError");

function apiErrorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code);
    res.json({
      status: false,
      error_code: err.code,
      error_message: err.msg,
    });
  } else {
    if (err.isJoi == true) {
      res.status(422);
      res.json({
        status: false,
        error_code: 422,
        error_message: err.message,
      });
    } else {
      res.status(500);
      res.json({
        status: false,
        error_message: "Some think went worng",
      });
    }
  }
}
module.exports = apiErrorHandler;
