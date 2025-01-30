// src/OrderHistoryPage.js

import axios from "axios";
import React, { useEffect, useState } from "react";

const OrderHistoryPage = () => {
  // Example orders data

  const [profile, setProfile] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/UserProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (err) {
        console.error(
          "Failed to fetch profile:",
          err.response?.data || err.message
        );
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/orders?email=" + profile.email,
          {}
        );
        setOrders(response.data);
      } catch (err) {
        console.error(
          "Failed to fetch orders:",
          err.response?.data || err.message
        );
      }
    };

    fetchOrders();
  }, [profile]);

  console.log(profile);
  console.log(orders);
  const [activeOrderId, setActiveOrderId] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setActiveOrderId(activeOrderId === orderId ? null : orderId);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-8"
      style={{
        backgroundImage:
          "url('https://tse4.mm.bing.net/th?id=OIP.BslWCv3ikZbb4QLB1Or_3wHaEK&rs=1&pid=ImgDetMain')",
      }}
    >
      <div className="container mx-auto p-4 bg-opacity-70 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">
          Order History
        </h1>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-gray-400 rounded-lg shadow-md p-6"
            >
              {/* Order Summary */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order._id}</h2>
                  <p className="text-sm text-black">Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">₹{order.totalAmount}</p>
                </div>
              </div>

              {/* Toggle Details Button */}

              {/* Order Details (Toggleable) */}

              <div className="mt-4">
                <h3 className="font-semibold text-lg">Items:</h3>
                <ul className="space-y-2">
                  {order.cart.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-black">
                  Total: <strong>₹{order.totalAmount}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
