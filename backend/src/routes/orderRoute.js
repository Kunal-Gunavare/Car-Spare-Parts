const express = require("express");
const { makeOrder, getOrders } = require("../controllers/orderController");

const router = express.Router();

// Routes for Order
router.post("/create", makeOrder);
router.get("/", getOrders);

module.exports = router;
