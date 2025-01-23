import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handlePayment = () => {
    const totalAmount = calculateTotal() * 100; // Convert to paise (smallest currency unit)

    const options = {
      key: "rzp_test_A1eGvI4gGCQcVu", // Replace with your Razorpay API Key
      amount: totalAmount,
      currency: "INR",
      name: "Car Spares Parts Store",
      description: "Thank you for shopping with us!",
      image: "https://yourlogo.com/logo.png", // Replace with your logo URL
      handler: (response) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: "John Doe", // Replace with the user's name
        email: "johndoe@example.com", // Replace with the user's email
        contact: "9876543210", // Replace with the user's phone number
      },
      notes: {
        address: "Corporate Office Address",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentInstance = new window.Razorpay(options);
    paymentInstance.open();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="bg-gray-800 p-4 mb-4 rounded-lg">
              <h2>{item.name}</h2>
              <p>Price: ₹{item.price}</p>
              <button
                className="bg-red-500 px-4 py-2 rounded"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <h2 className="text-xl mt-4">Total: ${calculateTotal()}</h2>
          <button
            className="bg-green-500 px-6 py-2 rounded text-lg font-bold hover:bg-green-600 mt-4"
            onClick={handlePayment}
          >
            Pay with Razorpay
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
