const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB, sequelize } = require("./config/db.js"); // Correct path
const authRoutes = require("./routes/user.route.js");
const adminUserRoutes = require("./routes/adminuser.route.js");
const purchaseRoutes = require("./routes/purchaseHistory.route.js");
const itemRoutes = require("./routes/item.routes.js");
const categoryRoutes = require("./routes/category.routes.js");
const aiRoutes = require("./routes/aichat.routes.js");
const budgetRoutes = require("./routes/budget.route.js");
const expenseRoutes = require("./routes/expense.route.js");
const healthProfileRoutes = require("./routes/healthProfile.route.js");

dotenv.config(); // Load environment variables

// Ensure required environment variables are loaded
const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error("❌ Missing database configuration in environment variables.");
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

app.use("/api/auth", authRoutes);

// Use Admin Routes
app.use("/api/adminusers", adminUserRoutes);

// Purchase History Routes
app.use("/api/purchase-history", purchaseRoutes);

//Item Routes
app.use("/api/items", itemRoutes);

//Category Routes
app.use("/api/categories", categoryRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/budget", budgetRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/health-profiles", healthProfileRoutes);

// Connect to MySQL Database
connectDB();

// Sync Models (Optional: Uncomment if you want Sequelize to auto-create tables)
// sequelize.sync({ alter: true })
//   .then(() => console.log("✅ Database synchronized successfully!"))
//   .catch((err) => console.error("❌ Error syncing database:", err));

// Start Server
const serverPort = PORT || 8000;
app.listen(serverPort, () => {
  console.log(`🚀 Server is running on port ${serverPort}`);
});
