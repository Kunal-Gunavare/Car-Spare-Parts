
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://car-spare-parts-backend.vercel.app/auth/login", {
        email: formData.email,
        password: formData.password,
      });
 
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token",token)
        alert("Login successful!");
        navigate("/Dashboard"); // Redirect to Dashboard page
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed. Try again!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-blue-400">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Image Section */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: "url('https://media.istockphoto.com/id/1269648167/photo/car-parts-spares-and-accesoires-auto-service-and-car-repair-workshop-concept.jpg?s=170667a&w=0&k=20&c=rGBJWkVeYt2ksMInvpyDgg_S3taV6RJUhP9XpPlkzsg=')" }}
        ></div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-light text-center mb-6">Login</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 rounded-full font-bold uppercase hover:bg-blue-700 transition"
            >
              Login
            </button>
            <div className="flex justify-between items-center mt-4">
              <a
                href="/forgot"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
              <a
                href="/register"
                className="text-sm text-blue-600 hover:underline"
              >
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;






