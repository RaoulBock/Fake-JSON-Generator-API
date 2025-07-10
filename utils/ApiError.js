class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // to differentiate expected errors
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
