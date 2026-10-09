const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { resetData } = require('./data/postStore');
const controller = require('./controllers/postController');

function createApp() {
  const app = express();
  app.use(express.json());

  app.use('/', postRoutes);
  app.get('/explode', controller.explode);

  // TODO:
  // - make public contract resource-oriented
  // - standardise success envelope
  // - standardise error envelope
  // - add pagination metadata on list route
  // - cap limit server-side (default limit = 2 for exercise)
  // - stop exposing old verb routes as public contract
  // - expose safe internal failure route for testing/demo

  return app;
}

if (require.main === module) {
  const app = createApp();
  const port = 3000;
  app.listen(port, () => {
    console.log(`Starter API listening on port ${port}`);
  });
}

module.exports = {
  createApp,
  resetData
};
