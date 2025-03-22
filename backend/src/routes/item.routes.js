const express = require("express");

const itemController = require("../controllers/item.controller");

const itemRoutes = express.Router();

// Create a new item
itemRoutes.post("/items", itemController.createItem);

// Get all items
itemRoutes.get("/items", itemController.getAllItems);

// Get a single item by ID
itemRoutes.get("/items/:id", itemController.getItemById);

// Update an item by ID
itemRoutes.put("/items/:id", itemController.updateItem);

// Delete an item by ID
itemRoutes.delete("/items/:id", itemController.deleteItem);

// Search for items by name
itemRoutes.get("/items/search", itemController.searchItems);

module.exports = itemRoutes;
