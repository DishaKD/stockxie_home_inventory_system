const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Check if all required environment variables are set
if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
  console.error("❌ Missing database configuration in environment variables.");
  process.exit(1);
}

// Function to create the database if it doesn't exist
const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT) || 3306,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Database "${DB_NAME}" checked/created successfully.`);
    await connection.end();
  } catch (error) {
    console.error("❌ Database creation failed:", error);
    process.exit(1);
  }
};

// Initialize Sequelize with MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT) || 3306,
  dialect: "mysql",
  logging: false, // Disable logging queries in console
});

// Connect to MySQL and create the database if not exists
const connectDB = async () => {
  try {
    await createDatabase(); // Ensure the database exists
    await sequelize.authenticate(); // Test the database connection
    console.log("✅ MySQL Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1); // Exit if database connection fails
  }
};

module.exports = { sequelize, connectDB };
