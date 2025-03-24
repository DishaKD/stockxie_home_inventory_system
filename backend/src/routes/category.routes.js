const express = require("express");
const categoryRoutes = express.Router();
const categoryController = require("../controllers/category.controller");
const authenticate = require("../middlewares/auth.middleware"); // Authentication middleware

categoryRoutes.post("/", authenticate, categoryController.createCategory);
categoryRoutes.get("/", authenticate, categoryController.getCategories);
categoryRoutes.put("/:id", authenticate, categoryController.updateCategory);
categoryRoutes.delete("/:id", authenticate, categoryController.deleteCategory);

module.exports = categoryRoutes;
