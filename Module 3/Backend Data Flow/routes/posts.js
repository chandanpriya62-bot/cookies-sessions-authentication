const express = require('express');
const router = express.Router();
const ctrl = require('./../controllers/postsController');
const asyncHandler = require('./../utils/asyncHandler');
const validateRequest = require('./../utils/validateRequest');
const v = require('./../validators/post.validator');

router.get('/', asyncHandler(ctrl.list));
router.post('/', v.createPost, validateRequest, asyncHandler(ctrl.create));
router.patch('/:id', v.editPost, validateRequest, asyncHandler(ctrl.edit));
router.post('/:id/comments', v.addComment, validateRequest, asyncHandler(ctrl.addComment));
router.post('/:id/votes', asyncHandler(ctrl.vote));

module.exports = router;
