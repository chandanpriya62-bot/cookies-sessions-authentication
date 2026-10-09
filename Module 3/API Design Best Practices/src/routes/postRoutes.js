const express = require('express');
const controller = require('../controllers/postController');

const router = express.Router();

router.get('/getPosts', controller.listPosts);
router.get('/getPost/:id', controller.getPost);
router.post('/createPost', controller.createPost);
router.post('/likePost/:id', controller.likePost);

module.exports = router;
