/**
 * auditWrite middleware  [mount PER-ROUTE in routes/posts.js]
 *
 * This middleware is already complete. Your job is to import and mount it
 * on the POST route inside routes/posts.js, showing how per-route middleware
 * differs from global middleware.
 */
module.exports = function auditWrite(req, res, next) {
  const shortId = req.id ? `[${req.id.substring(0, 8)}] ` : '';
  console.log(`[AUDIT] ${shortId}Write request received for ${req.method} ${req.originalUrl || req.path}`);
  next();
};
