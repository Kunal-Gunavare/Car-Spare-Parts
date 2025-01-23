import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import ProductListing from "./pages/ProductListing";
import Product from "./pages/products";
import productDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import UserProfile from "./pages/UserProfile";
import OrderHistory from "./pages/OrderHistory";
import Dashboard from "./pages/Dashboard";
import CartProvider from "./context/CartContext";


function App() {
  return (
    <BrowserRouter>
        <CartProvider>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword/>} /> 
        <Route path="/Home" element={<HomePage/>} /> 
        <Route path="/ProductListing" element={<ProductListing/>} /> 
        <Route path="/ProductDetail" element={<productDetail/>}/>
        <Route path="/Product" element={<Product/>} /> 
        <Route path="/Cart" element={<CartPage/>} /> 
        <Route path="/Checkout" element={<Checkout/>} /> 
        <Route path="/Profile" element={<UserProfile/>} /> 
        <Route path="/OrderHistory" element={<OrderHistory/>} /> 
        <Route path="/login" element={<Login/>}/>
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
