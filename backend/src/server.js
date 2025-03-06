const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./config/db.js"); // Correct path

dotenv.config(); // Load environment variables

// Ensure required environment variables are loaded
const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error("❌ Missing  configuration in environment variables.");
  process.exit(1);
}

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
const serverPort = PORT || 5000;
app.listen(serverPort, () => {
  console.log(`🚀 Server is running on port ${serverPort}`);
});
