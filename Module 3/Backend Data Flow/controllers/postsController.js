/**
 * Controllers are thin HTTP adapters: read the request, call ONE service method,
 * send the response. They hold no domain rules. Identity comes from req.userId.
 */
const postsService = require('./../services/postsService');
const commentsService = require('./../services/commentsService');
const votesService = require('./../services/votesService');

exports.list = async (req, res) => {
  res.json({ data: await postsService.getAll() });
};

exports.create = async (req, res) => {
  const post = await postsService.create({ authorId: req.userId, title: req.body.title, body: req.body.body });
  res.status(201).json({ data: post });
};

exports.edit = async (req, res) => {
  const post = await postsService.editPost(Number(req.params.id), req.userId, req.body);
  res.json({ data: post });
};

exports.addComment = async (req, res) => {
  const comment = await commentsService.addComment(Number(req.params.id), req.userId, req.body.body);
  res.status(201).json({ data: comment });
};

exports.vote = async (req, res) => {
  const vote = await votesService.castVote(Number(req.params.id), req.userId);
  res.status(201).json({ data: vote });
};
