const express = require("express");
const itemController = require("../controllers/item.controller");
const itemRoutes = express.Router();
const authenticate = require("../middlewares/auth.middleware"); // Authentication middleware

// Create a new item
itemRoutes.post("/create", itemController.createItem);

// Get all items
itemRoutes.get("/", authenticate, itemController.getAllItems);

// Get a single item by ID
itemRoutes.get("/:id", itemController.getItemById);

// Update an item by ID
itemRoutes.put("/update/:id", itemController.updateItem);

// Delete an item by ID
itemRoutes.delete("/delete/:id", itemController.deleteItem);

// Search for items by name
itemRoutes.get("/search", itemController.searchItems);

module.exports = itemRoutes;
