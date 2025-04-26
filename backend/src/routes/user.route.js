const express = require("express");
const {
  loginUser,
  registerUser,
  getProfile,
  getAllUsers,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRoutes = express.Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/register", registerUser);

authRoutes.get("/profile", authMiddleware, getProfile);

authRoutes.get("/users",getAllUsers); // or just authenticate


module.exports = authRoutes;
