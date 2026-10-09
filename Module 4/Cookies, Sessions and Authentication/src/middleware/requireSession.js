
const sessionStore = require('../services/sessionStore');

module.exports = function requireSession(req, res, next) {
  const sid = req.signedCookies?.sid;

  if (!sid) {
    return res.status(401).json({
      error: { code: 'AUTH_REQUIRED' }
    });
  }

  const session = sessionStore.get(sid);

  if (!session || session.expiresAt <= Date.now()) {
    if (session) sessionStore.destroy(sid);

    return res.status(401).json({
      error: { code: 'AUTH_REQUIRED' }
    });
  }

  req.user = { id: session.userId };

  return next();
};