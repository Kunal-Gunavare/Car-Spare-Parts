import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { CartContext } from "../context/CartContext";
//kunal
const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", image: "" });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const { cart, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";

  useEffect(() => {
    Modal.setAppElement("#root"); // Ensure this matches your app's root element
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      categoryFilter ? product.category.toLowerCase().includes(categoryFilter.toLowerCase()) : true
    );
    setFilteredProducts(filtered);
  }, [categoryFilter, products]);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/products", newProduct);
      if (response.status === 200) {
        setProducts([...products, response.data]);
        setIsModalOpen(false);
        setNewProduct({ name: "", category: "", price: "", image: "" });
      }
    } catch (error) {
      console.error("Error adding product", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const navigateToCart = () => navigate("/cart");

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-black sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-3xl font-extrabold">
            <span className="text-gray-300">Car</span>
            <span className="text-green-500">Spares</span>
            <span className="text-green-500">Parts</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/dashboard" className="text-gray-300 hover:text-green-500">Dashboard</Link>
            <Link to="/orders" className="text-gray-300 hover:text-green-500">Orders</Link>
            <Link to="/profile" className="text-gray-300 hover:text-green-500">Profile</Link>
            <Link to="/settings" className="text-gray-300 hover:text-green-500">Settings</Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Product
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-gray-300 hover:text-green-500">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Logout
            </a>
            <button onClick={navigateToCart} className="bg-green-500 text-white px-6 py-3 rounded-lg">
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> {cart.length} Items
            </button>
          </div>
        </div>
      </header>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add New Product"
        className="bg-gray-800 p-6 rounded-lg w-1/3 mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl text-green-500 mb-4">Add New Product</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Product Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded text-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAddProduct}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Add Product
            </button>
          </div>
        </form>
      </Modal>

      {/* Dashboard Content */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-500 mb-8">Welcome to Your Dashboard</h2>

          {/* Category Filter */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Filter by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-1/2 p-2 bg-gray-700 rounded-lg text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="bg-gray-700 p-6 rounded-lg shadow-lg">
                <img
                  src={product.image || fallbackImage}
                  alt={product.name}
                  onError={(e) => (e.target.src = fallbackImage)}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl text-green-500 mb-4">{product.name}</h3>
                <p className="text-gray-300">Category: {product.category}</p>
                <p className="text-gray-300">Price: ₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg mt-4"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
