const { body } = require('express-validator');

// Request-SHAPE checks only (HTTP rules). The domain rules live in the service.
exports.createPost = [
  body('title').notEmpty().withMessage('title is required').trim(),
  body('body').notEmpty().isLength({ max: 5000 }).withMessage('body is required (<= 5000 chars)'),
];

exports.editPost = [
  body('title').optional().notEmpty().trim(),
  body('body').optional().isLength({ max: 5000 }),
];

exports.addComment = [
  body('body').notEmpty().isLength({ max: 2000 }).withMessage('comment body is required (<= 2000 chars)'),
];
