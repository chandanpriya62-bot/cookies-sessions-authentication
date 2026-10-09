/**
 * Users router (already written). Mounted at /users in app.js.
 * You do not need to edit this file.
 */

const express = require('express');
const router = express.Router();

const users = [{ id: 1, name: 'Ada' }];

router.get('/', (req, res) => {
  res.json({ data: users });
});

module.exports = router;
