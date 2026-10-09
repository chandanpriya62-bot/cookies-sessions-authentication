const express = require('express');
const orderController = require('./controllers/orderController');

const app = express();
app.use(express.json());

app.post('/orders', orderController.create);

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({ error: error.message });
});

if (require.main === module) {
  app.listen(process.env.PORT || 3000, () => console.log('API listening'));
}

module.exports = app;
