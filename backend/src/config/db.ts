import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

// Function to create the database if it doesn't exist
const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: Number(DB_PORT) || 3306,
      user: DB_USER,
      password: DB_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(`✅ Database "${DB_NAME}" checked/created successfully.`);
    await connection.end();
  } catch (error) {
    console.error("❌ Database creation failed:", error);
    process.exit(1);
  }
};

// Initialize Sequelize with MySQL
const sequelize = new Sequelize(
  DB_NAME as string,
  DB_USER as string,
  DB_PASSWORD as string,
  {
    host: DB_HOST,
    port: Number(DB_PORT) || 3306,
    dialect: "mysql",
    logging: false, // Disable logging queries in console
  }
);

// Connect to MySQL and create the database if not exists
const connectDB = async () => {
  try {
    await createDatabase(); // Ensure the database exists
    await sequelize.authenticate();
    console.log("✅ MySQL Database Connected Successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
    process.exit(1); // Exit if database connection fails
  }
};

export { sequelize, connectDB };
