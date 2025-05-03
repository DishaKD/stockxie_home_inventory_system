const express = require("express");
const itemController = require("../controllers/item.controller");
const itemRoutes = express.Router();
const authenticate = require("../middlewares/auth.middleware");

// Create a new item
itemRoutes.post("/create", itemController.createItem);

// Get all items
itemRoutes.get("/", authenticate, itemController.getAllItems);

// Search for items by name
itemRoutes.get("/search", authenticate, itemController.searchItems);

// Get a single item by ID
itemRoutes.get("/:id", itemController.getItemById);

// Update an item by ID
itemRoutes.put("/update/:id", itemController.updateItem);

// Delete an item by ID
itemRoutes.delete("/delete/:id", itemController.deleteItem);

module.exports = itemRoutes;
