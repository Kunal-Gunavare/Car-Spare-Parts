const Product = require('../models/product');

// Controller to add a new product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, image } = req.body;

    if (!name || !category || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = new Product({
      name,
      category,
      price,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Controller to get all products (optional, for displaying on dashboard)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
