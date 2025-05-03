const express = require("express");
const {
  loginUser,
  registerUser,
  getProfile,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const authRoutes = express.Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/register", registerUser);

authRoutes.get("/profile", authMiddleware, getProfile);

authRoutes.get("/users", getAllUsers);
authRoutes.delete("/id", deleteUser);
authRoutes.put("/users/update/:id", updateUser);

module.exports = authRoutes;
