import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db"; // Import DB config

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Home Inventory Management System API is running...");
});

// Connect to MySQL Database
connectDB();

// Sync Models (Optional: Uncomment if you want Sequelize to auto-create tables)
// sequelize.sync({ alter: true })
//   .then(() => console.log("✅ Database synchronized successfully!"))
//   .catch((err) => console.error("❌ Error syncing database:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
