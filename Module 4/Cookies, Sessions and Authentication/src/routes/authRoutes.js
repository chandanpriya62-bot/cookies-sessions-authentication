
const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const router = express.Router();

// Adjust these paths to match your starter project.
const userRepository = require('../repositories/userRepository');
const sessionStore = require('../services/sessionStore');
const cookieOptions = require('../config/cookie');

router.post('/login', async (req, res, next) => {
  try {
    const email =
      typeof req.body?.email === 'string'
        ? req.body.email.trim().toLowerCase()
        : '';

    const password = req.body?.password;

    if (!email || typeof password !== 'string' || !password) {
      return res.status(400).json({
        error: { code: 'INVALID_INPUT' }
      });
    }

    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({
        error: { code: 'INVALID_CREDENTIALS' }
      });
    }

    const sid = crypto.randomUUID();
    const expiresAt = Date.now() + 60 * 60 * 1000;

    sessionStore.create(sid, {
      userId: user.id,
      expiresAt
    });

    res.cookie('sid', sid, {
      ...cookieOptions(),
      signed: true,
      maxAge: 60 * 60 * 1000
    });

    return res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const sid = req.signedCookies?.sid;
    const session = sid && sessionStore.get(sid);

    if (!session || session.expiresAt <= Date.now()) {
      if (session) sessionStore.destroy(sid);

      return res.status(401).json({
        error: { code: 'AUTH_REQUIRED' }
      });
    }

    const user = await userRepository.findPublicById(
      session.userId
    );

    if (!user) {
      sessionStore.destroy(sid);

      return res.status(401).json({
        error: { code: 'AUTH_REQUIRED' }
      });
    }

    return res.status(200).json({
      data: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  try {
    const sid = req.signedCookies?.sid;

    if (sid) {
      sessionStore.destroy(sid);
    }

    res.clearCookie('sid', {
      ...cookieOptions(),
      signed: true
    });

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;