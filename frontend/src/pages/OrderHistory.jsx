// src/OrderHistoryPage.js

import React, { useState } from 'react';

const OrderHistoryPage = () => {
  // Example orders data
  const [orders] = useState([
    {
      orderId: '1001',
      date: '2024-01-12',
      total: 150.00,
      status: 'Delivered',
      items: [
        { product: 'Brake Pads', quantity: 2, price: 30.00 },
        { product: 'Engine Oil', quantity: 1, price: 50.00 },
        { product: 'Tire', quantity: 2, price: 20.00 },
      ],
    },
    {
      orderId: '1002',
      date: '2024-01-08',
      total: 90.00,
      status: 'Shipped',
      items: [
        { product: 'Air Filter', quantity: 2, price: 15.00 },
        { product: 'Wiper Blade', quantity: 2, price: 10.00 },
      ],
    },
    {
      orderId: '1003',
      date: '2024-01-05',
      total: 210.00,
      status: 'Pending',
      items: [
        { product: 'Transmission Fluid', quantity: 3, price: 40.00 },
        { product: 'Battery', quantity: 1, price: 50.00 },
      ],
    },
  ]);

  const [activeOrderId, setActiveOrderId] = useState(null);

  const toggleOrderDetails = (orderId) => {
    setActiveOrderId(activeOrderId === orderId ? null : orderId);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-8"
      style={{
        backgroundImage: "url('https://tse4.mm.bing.net/th?id=OIP.BslWCv3ikZbb4QLB1Or_3wHaEK&rs=1&pid=ImgDetMain')",
      }}
    >
      <div className="container mx-auto p-4 bg-opacity-70 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center text-white">Order History</h1>
        
        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-gray-400 rounded-lg shadow-md p-6"
            >
              {/* Order Summary */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Order #{order.orderId}</h2>
                  <p className="text-sm text-black">Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold">${order.total.toFixed(2)}</p>
                  <p
                    className={`text-sm mt-2 ${
                      order.status === 'Delivered'
                        ? 'text-green-900'
                        : order.status === 'Shipped'
                        ? 'text-yellow-900'
                        : 'text-red-900'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              {/* Toggle Details Button */}
              <button
                onClick={() => toggleOrderDetails(order.orderId)}
                className="text-green-900 hover:text-green-900 transition-colors"
              >
                {activeOrderId === order.orderId ? 'Hide Details' : 'View Details'}
              </button>

              {/* Order Details (Toggleable) */}
              {activeOrderId === order.orderId && (
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.product}</span>
                        <span>
                          {item.quantity} x ${item.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-black">
                    Total: <strong>${order.total.toFixed(2)}</strong>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
