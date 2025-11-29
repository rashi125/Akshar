require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/testRoutes");
// const { configDotenv } = require("dotenv");
// config();
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({
  origin:  [
    process.env.FRONTEND_URL,           // https://felus.in
    "https://felus.in",                // fallback
    "https://akshar-4-lzvr.onrender.com", 
    "http://localhost:3000"            // dev
  ],
  credentials :true
}));
app.use(bodyParser.json());
app.use("/api/tests", testRoutes);
// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
