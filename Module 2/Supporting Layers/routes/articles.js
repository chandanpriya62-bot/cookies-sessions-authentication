/**
 * Articles router — STARTER (validation defined INLINE).
 *
 * PROBLEM: the validation chains and the validationResult check live right here
 * in the route file. They belong in validators/ (the chains) and utils/ (the
 * validateRequest helper).
 *
 * TODO:
 *   - Move the createArticle / updateArticle chains to validators/article.validator.js
 *     and import them here.
 *   - Move the inline (req,res,next) validationResult check into
 *     utils/validateRequest.js and import it here.
 *   - Wrap the async controller calls with utils/asyncHandler.js instead of try/catch.
 */

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const ctrl = require('./../controllers/articlesController');

// INLINE validation result check — should move to utils/validateRequest.js
function checkValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: 'Validation failed', details: errors.array() });
  }
  next();
}

router.get('/', ctrl.list);

// INLINE chains — should move to validators/article.validator.js
router.post(
  '/',
  body('title').notEmpty().withMessage('Title is required').trim(),
  body('body').notEmpty().isLength({ max: 2000 }).withMessage('Body is required and must be under 2000 characters'),
  checkValidation,
  ctrl.create
);

router.patch(
  '/:id',
  body('title').optional().notEmpty().trim(),
  body('body').optional().isLength({ max: 2000 }),
  checkValidation,
  ctrl.update
);

module.exports = router;
