/**
 * articles-api — STARTER (scattered state)
 *
 * This app works, but it violates every rule from the "Supporting Layers" lesson:
 *   - validation chains are written INLINE in routes/articles.js
 *   - process.env is read directly HERE and in services/articlesService.js and
 *     middleware/errorHandler.js (no single config module)
 *   - AppError is DUPLICATED in services and middleware (no utils/ home)
 *
 * Your job (see question.md):
 *   1. Move validation chains into  validators/article.validator.js
 *   2. Create  utils/AppError.js, utils/asyncHandler.js, utils/validateRequest.js
 *   3. Create  config/index.js  as the ONLY file that reads process.env
 *   4. Add a committed  .env.example  and keep  .env  in .gitignore
 *
 * Run it with:  npm start
 */

const express = require('express');
const articlesRouter = require('./routes/articles');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

app.use('/articles', articlesRouter);

app.use(errorHandler);

// TODO: this process.env read should move into config/index.js, then import it.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`articles-api listening on http://localhost:${PORT}`);
});

module.exports = app;
