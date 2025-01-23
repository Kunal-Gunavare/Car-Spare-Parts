// src/CheckoutPage.js

import React, { useState } from 'react';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Brake Pad', price: 50, quantity: 2, image: 'https://tse1.mm.bing.net/th?id=OIP.HGc0UPd2-4v4HXMIG5WzugHaEy&rs=1&pid=ImgDetMain' },
    { id: 2, name: 'Oil Filter', price: 20, quantity: 3, image: 'https://tse4.mm.bing.net/th?id=OIP.tN3RL4bPjmvFF-lLpOgk8AAAAA&rs=1&pid=ImgDetMain' },
    { id: 3, name: 'Air Filter', price: 15, quantity: 1, image: 'https://tse4.mm.bing.net/th?id=OIP.FZypcNDeiCxVrc5UOFXxTgHaFj&rs=1&pid=ImgDetMain' },
  ]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate totals
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder logic for submitting form
    alert('Order Submitted!');
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://th.bing.com/th/id/R.b2ed87607b57f331886454e99265e40c?rik=3v2cbXwYhtFqmQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2ftEqlZ1w.jpg&ehk=dVHcCAzp5i2EzL77DIuUfTdBFFHJC0SGIiZUmsjwyEs%3d&risl=&pid=ImgRaw&r=0')" }}>
      <div className="container mx-auto p-8 bg-opacity-80 rounded-lg">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">Checkout</h1>

        {/* Categories Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://d3vl3jxeh4ou3u.cloudfront.net/different%20engine%20parts.jpg" alt="Engine Parts" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Engine Parts</h3>
            <p className="text-black">High-quality parts for your engine.</p>
          </div>

          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://res.cloudinary.com/yourmechanic/image/upload/dpr_auto,f_auto,q_auto/v1/article_images/suspension_system" alt="Brakes & Suspension" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Brakes & Suspension</h3>
            <p className="text-black">Parts to ensure safety and comfort.</p>
          </div>

          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://tse3.mm.bing.net/th?id=OIP.9tKNGRh6tOVb7DAOOPGSKgAAAA&rs=1&pid=ImgDetMain" alt="Transmission Parts" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Transmission Parts</h3>
            <p className="text-black">High-performance transmission components.</p>
          </div>

          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://tse4.mm.bing.net/th?id=OIP.oRizOBSs6ElT1P4bMQC_ywHaE6&rs=1&pid=ImgDetMain" alt="Tires & Wheels" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Tires & Wheels</h3>
            <p className="text-black">Top-quality tires and wheels.</p>
          </div>

          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://cfx-wp-images.imgix.net/2021/05/GettyImages-1040386448-scaled.jpeg?auto=compress%2Cformat&fit=crop&h=839&ixlib=php-3.3.0&rect=0%2C1005%2C1709%2C1400&w=1024&wpsize=large&s=5471609869970c94e1e2d713e66eba50" alt="Air Filters" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Air Filters</h3>
            <p className="text-black">Air filters to keep your engine clean.</p>
          </div>

          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://thumbs.dreamstime.com/b/automotive-motor-oil-filter-engine-compartment-automotive-motor-oil-filter-engine-compartment-auto-maintenance-261978983.jpg" alt="Oil Filters" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Oil Filters</h3>
            <p className="text-black">Oil filters to maintain engine health.</p>
          </div>

          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://images.saymedia-content.com/.image/t_share/MTc0OTYwMzY0NjM3OTg4NTIy/choosing-a-car-battery---guide.jpg" alt="Battery" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Battery</h3>
            <p className="text-black">Reliable and long-lasting car batteries.</p>
          </div>

          <div className="bg-gray-400 p-6 rounded-lg shadow-lg text-center">
            <img src="https://tse1.mm.bing.net/th?id=OIP.Ew_hEiinf6sZZipE3mgKzwHaHa&rs=1&pid=ImgDetMain" alt="Wiper Blades" className="mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Wiper Blades</h3>
            <p className="text-black">High-performance wiper blades.</p>
          </div>
        </div>

        {/* Cart Summary Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b py-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div>
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Price: ${item.price}</p>
                  </div>
                </div>
                <span className="text-lg">{item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6 font-bold text-xl">
              <p>Total</p>
              <p>${calculateTotal()}</p>
            </div>
          </div>

          {/* Billing Information Form */}
          <div className="bg-gray-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-6">Billing Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-lg">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="p-3 rounded-md border border-gray-400"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-3 rounded-md border border-gray-400"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-lg">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="p-3 rounded-md border border-gray-400"
                    required
                  />
                </div>
                <div className="flex flex-col md:flex-row space-x-4">
                  <div className="flex flex-col w-full">
                    <label htmlFor="city" className="text-lg">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="p-3 rounded-md border border-gray-400"
                      required
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label htmlFor="zipCode" className="text-lg">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="p-3 rounded-md border border-gray-400"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="country" className="text-lg">Country</label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="p-3 rounded-md border border-gray-400"
                    required
                  />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="submit"
                    className="bg-green-800 text-white px-8 py-3 rounded-md hover:bg-green-800 transition-colors"
                  >
                    Complete Order
                  </button>
                  <div className="text-lg font-bold">
                    Total: ${calculateTotal()}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
