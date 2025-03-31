const express = require("express");
const adminUserController = require("../controllers/adminuser.controller");

const adminUserRoutes = express.Router();

// Routes
adminUserRoutes.post("/", adminUserController.createAdminUser);
adminUserRoutes.post("/login", adminUserController.loginAdmin);
adminUserRoutes.get("/", adminUserController.getAllAdminUsers);
adminUserRoutes.get("/:id", adminUserController.getAdminUserById);
adminUserRoutes.put("/:id", adminUserController.updateAdminUser);
adminUserRoutes.delete("/:id", adminUserController.deleteAdminUser);

module.exports = adminUserRoutes;
