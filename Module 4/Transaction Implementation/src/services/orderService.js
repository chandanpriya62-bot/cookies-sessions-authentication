const orderRepository = require('../repositories/orderRepository');

async function createOrder(fields) {
  if (!fields || !fields.productId || !fields.amount) {
    const error = new Error('productId and amount are required');
    error.statusCode = 422;
    throw error;
  }
  return orderRepository.placeOrder(Number(fields.productId), Number(fields.amount));
}

module.exports = { createOrder };
