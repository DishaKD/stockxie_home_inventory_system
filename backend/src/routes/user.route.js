const express = require("express");
const { loginUser, registerUser } = require("../controllers/user.controller");

const authRoutes = express.Router();

authRoutes.post("/login", loginUser);
authRoutes.post("/register", registerUser);

module.exports = authRoutes;
