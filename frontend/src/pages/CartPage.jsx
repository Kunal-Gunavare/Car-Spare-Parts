import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useContext(CartContext);
  const [showForm, setShowForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    pinCode: "",
    phone: "",
    email: "",
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const storeOrderInDatabase = (paymentId) => {
    const orderData = {
      userDetails,
      cart,
      totalAmount: calculateTotal(),
      paymentId,
    };

    console.log("order data:", orderData);
    fetch("https://car-spare-parts-backend.vercel.app/api/orders/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Order placed successfully!");
      })
      .catch((error) => {
        console.error("Error storing order:", error);
      });
    navigate("/OrderHistory");
  };

  const handlePayment = () => {
    const totalAmount = calculateTotal() * 100; // Convert to paise

    const options = {
      key: "rzp_test_A1eGvI4gGCQcVu", // Replace with your Razorpay API Key
      amount: totalAmount,
      currency: "INR",
      name: "Car Spares Parts Store",
      description: "Thank you for shopping with us!",
      image: "https://yourlogo.com/logo.png",
      handler: (response) => {
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        storeOrderInDatabase(response.razorpay_payment_id);
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentInstance = new window.Razorpay(options);
    paymentInstance.open();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-md flex flex-col items-center">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 p-4 mb-4 rounded-lg w-full text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 mx-auto mb-2 rounded"
              />
              <h2>{item.name}</h2>
              <p>Price: ₹{item.price}</p>
              <button
                className="bg-red-500 px-4 py-2 rounded mt-2"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl mt-4">Total: ₹{calculateTotal()}</h2>
          <button
            className="bg-blue-500 px-6 py-2 rounded text-lg font-bold hover:bg-blue-600 mt-4"
            onClick={() => setShowForm(true)}
          >
            Buy Now
          </button>
          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[500px] relative text-center">
                <button
                  className="absolute top-2 right-2 text-white text-xl"
                  onClick={() => setShowForm(false)}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={userDetails.pinCode}
                  onChange={handleInputChange}
                  className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={userDetails.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-3 mb-3 rounded bg-gray-700 text-white"
                />
                <button
                  className="bg-green-500 px-6 py-3 rounded text-lg font-bold hover:bg-green-600 mt-4 w-full"
                  onClick={handlePayment}
                >
                  Pay with Razorpay
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
