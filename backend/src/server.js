const express = require("express");
// import products from './../../frontend/src/pages/products';
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRouter = require("./routes/userRoute");
const corsMiddleware = require("./middlewares/corsMiddleware"); // Import middleware
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoute");
const app = express();
app.use(express.json());

const port = 3000;

// Explicitly configure CORS

const corsOptions = {
  origin:"https://car-spare-parts.vercel.app",
  credentials:true
}
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Use the userRouter for authentication and user-related routes
app.use("/api/v1/auth", userRouter);
 app.use("/api/orders", orderRoutes); // Handling order-related requests
app.use("/api/products", productRoutes); // Handling product-related requests
app.post("/api/cart", async (req, res) => {
  const { userId, cart } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { cart });
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart" });
  }
});
app.post("/api/cart/clear", async (req, res) => {
  const { userId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { cart: [] });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});

app.get("/", (req, res) => {
  console.log("hello world!");
  res.send("Server is running!");
});

// Start the server
app.listen(port, (error) => {
  if (error) {
    console.log("Error in starting server");
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${port}`);
});

export default app;