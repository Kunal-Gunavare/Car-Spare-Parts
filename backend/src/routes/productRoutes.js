const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route to add a new product
router.post('/', productController.addProduct);

// Route to get all products (optional, for dashboard)
router.get('/', productController.getProducts);

module.exports = router;
