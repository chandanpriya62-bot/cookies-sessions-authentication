/**
 * Operational error carrying an HTTP status. Services throw this; the central
 * error handler turns it into the response. Services never touch res directly.
 */
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
module.exports = AppError;
