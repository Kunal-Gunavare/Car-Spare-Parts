const cors = require("cors");

const corsMiddleware = cors({
    origin: "http://localhost:5173", // Change this to match your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
});

module.exports = corsMiddleware;


