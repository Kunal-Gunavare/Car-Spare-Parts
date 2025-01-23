
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
        name: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      alert("Registration failed. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('https://huykhong.com/codepen/wallpaper.jpg')" }}></div>
        
        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-light text-center mb-6">Register</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" required />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email address" required />
            </div>
            <hr />
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm Password" required />
            </div>
            <button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-full font-bold uppercase hover:bg-blue-700 transition">Register</button>
            <a href="/login" className="block text-center text-sm text-blue-600 mt-2 hover:underline">Sign In</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;