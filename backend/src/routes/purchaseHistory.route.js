const express = require('express');
const router = express.Router();
const purchaseHistoryController = require('../controllers/purchaseHistory.controller');

router.post('/', purchaseHistoryController.createPurchase);  // Create a new purchase record
router.get('/', purchaseHistoryController.getAllPurchases);  // Get all purchase records
router.get('/:id', purchaseHistoryController.getPurchaseById);  // Get a single purchase by ID
router.put('/:id', purchaseHistoryController.updatePurchase);  // Update a purchase record
router.delete('/:id', purchaseHistoryController.deletePurchase);  // Delete a purchase record

module.exports = router;
