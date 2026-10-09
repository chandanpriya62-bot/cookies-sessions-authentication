const orderService = require('../services/orderService');

async function create(req, res, next) {
  try {
    const result = await orderService.createOrder(req.body);
    return res.status(201).json({ data: result });
  } catch (error) {
    return next(error);
  }
}

module.exports = { create };
