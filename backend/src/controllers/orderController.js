const { Orders } = require("../models/orders");

exports.makeOrder = async (req, res) => {
  const order = await req.body;

  const newOrder = new Orders({
    cart: order.cart,
    totalAmount: order.totalAmount,
    paymentId: order.paymentId,
    userDetails: order.userDetails,
  });

  await newOrder.save();
  res.send(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Orders.find({
    "userDetails.email": req.query.email, // Enclose key in quotes
  });
  res.send(orders);
};
