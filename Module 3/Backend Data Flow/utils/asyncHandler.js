/** Wrap an async handler so a rejected promise is forwarded to next(err). */
module.exports = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
