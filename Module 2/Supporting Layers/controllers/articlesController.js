/**
 * Articles controller — STARTER.
 *
 * Each handler uses a repetitive try/catch to forward errors. Once you create
 * utils/asyncHandler.js you can wrap these in the route file and drop the
 * try/catch boilerplate here (the handlers become plain async functions).
 */

const service = require('./../services/articlesService');

exports.list = async (req, res, next) => {
  try {
    const articles = await service.getAll();
    res.json({ data: articles });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const article = await service.create(req.body);
    res.status(201).json({ data: article });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const article = await service.update(Number(req.params.id), req.body);
    res.json({ data: article });
  } catch (err) {
    next(err);
  }
};
