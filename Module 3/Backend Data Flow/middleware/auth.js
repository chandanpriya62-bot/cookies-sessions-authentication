/**
 * Auth stand-in. In a real app this would verify a token; here it reads the
 * "x-user-id" header so each request has a trusted identity at req.userId.
 * Controllers and services must use req.userId, never a userId from req.body.
 */
module.exports = function auth(req, res, next) {
  req.userId = Number(req.header('x-user-id')) || 1;
  next();
};
