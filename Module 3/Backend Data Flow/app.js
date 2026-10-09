/**
 * posts-api - a small layered Express app for the Domain Rules & Workflows assignment.
 *
 * The routes, controllers, validators, and repositories are already wired and working.
 * Your job lives in the service layer (see services/). Implement the domain rules and
 * the comment workflow described in question.md.
 *
 * A tiny auth stand-in (middleware/auth.js) sets req.userId from the "x-user-id" header,
 * so identity comes from the request context, NOT from req.body.
 *
 * Run with:  npm install  then  npm start
 */
const express = require('express');
const auth = require('./middleware/auth');
const postsRouter = require('./routes/posts');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());
app.use(auth); // sets req.userId

app.use('/posts', postsRouter);

// unmatched route -> 404 through the error pipeline
const AppError = require('./utils/AppError');
app.use((req, res, next) => next(new AppError('Not found', 404)));
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`posts-api listening on http://localhost:${PORT}`));

module.exports = app;
