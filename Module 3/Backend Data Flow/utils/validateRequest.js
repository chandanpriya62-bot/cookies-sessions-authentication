const { validationResult } = require('express-validator');
const AppError = require('./AppError');

/** Turn express-validator failures into a 422 AppError. */
module.exports = function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError('Validation failed', 422));
  }
  next();
};
