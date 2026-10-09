/**
 * Articles service — STARTER.
 *
 * PROBLEMS:
 *   - AppError is DEFINED here (and again in middleware/errorHandler.js). It should
 *     live once in utils/AppError.js and be imported in both places.
 *   - process.env.MAX_ARTICLES is read directly here. It should move into
 *     config/index.js and be imported as config.maxArticles.
 */

const repo = require('./../repository/articlesRepo');

// DUPLICATED definition — should move to utils/AppError.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// INLINE process.env read — should move to config/index.js (config.maxArticles)
const MAX_ARTICLES = parseInt(process.env.MAX_ARTICLES) || 50;

exports.getAll = async () => repo.findAll();

exports.create = async ({ title, body }) => {
  const count = await repo.count();
  if (count >= MAX_ARTICLES) {
    throw new AppError('Article limit reached', 403);
  }
  return repo.insert({ title, body });
};

exports.update = async (id, data) => {
  const article = await repo.findById(id);
  if (!article) throw new AppError('Article not found', 404);
  return repo.update(id, data);
};
