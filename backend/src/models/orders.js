const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      category: String,
      price: Number,
      image: String,
    },
  ],
  paymentId: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: String,
    required: true,
  },
  userDetails: {
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
  },
});

const Orders = mongoose.model("Orders", orderSchema);

module.exports = { Orders };