const express = require("express");
const purchaseHistoryController = require("../controllers/purchaseHistory.controller");
const purchaseRoutes = express.Router();

purchaseRoutes.post("/", purchaseHistoryController.createPurchase); // Create a new purchase record
purchaseRoutes.get("/", purchaseHistoryController.getAllPurchases); // Get all purchase records
purchaseRoutes.get("/:id", purchaseHistoryController.getPurchaseById); // Get a single purchase by ID
purchaseRoutes.put("/:id", purchaseHistoryController.updatePurchase); // Update a purchase record
purchaseRoutes.delete("/:id", purchaseHistoryController.deletePurchase); // Delete a purchase record

module.exports = purchaseRoutes;
