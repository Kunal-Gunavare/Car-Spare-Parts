import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const HomePage = () => {
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-black sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="text-3xl font-extrabold">
            <span className="text-gray-300">Car</span>
            <span className="text-green-500">Spares</span>
            <span className="text-green-500">Parts</span>
          </div>
          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            <a
              href="#home"
              className="text-gray-300 hover:text-green-500 transition duration-300"
            >
              Home
            </a>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-green-500 transition duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-green-500 transition duration-300"
            >
              Contact Us
            </button>
          </nav>
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="text-gray-300 hover:text-green-500 transition duration-300"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              My Account
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        {/* Background Image */}
        <div
          className="h-[80vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://media.istockphoto.com/id/1269648167/photo/car-parts-spares-and-accesoires-auto-service-and-car-repair-workshop-concept.jpg?s=170667a&w=0&k=20&c=rGBJWkVeYt2ksMInvpyDgg_S3taV6RJUhP9XpPlkzsg=')",
          }}
        ></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        {/* Content */}
        <div className="absolute inset-0 flex justify-center items-center text-center">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
              Welcome to <span className="text-green-500">CarSparesParts</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6 animate-fade-in-slow">
              Find your dream car with exclusive deals and offers.
            </p>
            <Link to={'/login'} className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition duration-300 animate-pulse">
              Login
            </Link> &nbsp;
            <Link to={'/register'} className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition duration-300 animate-pulse">
              Registration
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="bg-gray-800 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-500 mb-8 animate-fade-in">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold text-green-500 mb-4">
                Best Service
              </h3>
              <p className="text-gray-300">
                We provide the best services to make your car shopping easy.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold text-green-500 mb-4">
                Affordable Prices
              </h3>
              <p className="text-gray-300">
                Get exclusive deals on your favorite cars and accessories.
              </p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-bold text-green-500 mb-4">
                Easy Payments
              </h3>
              <p className="text-gray-300">
                Secure and flexible payment options for all our customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-black text-center py-8">
        <div className="container mx-auto">
          <h3 className="text-green-500 text-2xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 mb-6">We are dedicated to providing top-quality car spare parts with excellent service.</p>
          <h3 className="text-green-500 text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-400">Email: support@carsparesparts.com | Phone: +123 456 7890</p>
          <p className="text-gray-400">Location: 123 Car Street, Auto City, CA</p>
          <p className="text-gray-500 mt-6">&copy; 2025 Car Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
