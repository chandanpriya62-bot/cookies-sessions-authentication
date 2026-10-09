const prisma = require('../db/prisma');

// STARTER: two separate writes, no transaction.
// If the second write fails, the first has already committed. Fix this.
async function placeOrder(productId, amount) {
  const order = await prisma.order.create({
    data: { productId, amount },
  });
  const product = await prisma.product.update({
    where: { id: productId },
    data: { stock: { decrement: amount } },
  });
  return { order, stock: product.stock };
}

module.exports = { placeOrder };
