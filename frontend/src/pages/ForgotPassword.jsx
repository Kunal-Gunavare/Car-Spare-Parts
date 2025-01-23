import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  return (
    <div className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://www.mukand.com/wp-content/uploads/2022/12/6a-alloy-steel.jpg)' }}>
      <div className="bg-gray-400 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border rounded-full text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-black text-white rounded-full hover:bg-black transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
