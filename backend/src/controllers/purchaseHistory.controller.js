const PurchaseHistory = require('../models/purchaseHistory.model');

// Create a new purchase record
exports.createPurchase = async (req, res) => {
    try {
        const { itemName, category, purchaseDate, quantity, pricePerUnit } = req.body;
        const totalCost = quantity * pricePerUnit;

        const newPurchase = await PurchaseHistory.create({
            itemName,
            category,
            purchaseDate,
            quantity,
            pricePerUnit,
            totalCost
        });

        res.status(201).json({ success: true, message: 'Purchase record created', data: newPurchase });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all purchase records
exports.getAllPurchases = async (req, res) => {
    try {
        const purchases = await PurchaseHistory.findAll();
        res.status(200).json({ success: true, data: purchases });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a single purchase record by ID
exports.getPurchaseById = async (req, res) => {
    try {
        const purchase = await PurchaseHistory.findByPk(req.params.id);
        if (!purchase) {
            return res.status(404).json({ success: false, message: 'Purchase record not found' });
        }
        res.status(200).json({ success: true, data: purchase });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a purchase record
exports.updatePurchase = async (req, res) => {
    try {
        const { itemName, category, purchaseDate, quantity, pricePerUnit } = req.body;
        const totalCost = quantity * pricePerUnit;

        const purchase = await PurchaseHistory.findByPk(req.params.id);
        if (!purchase) {
            return res.status(404).json({ success: false, message: 'Purchase record not found' });
        }

        await purchase.update({ itemName, category, purchaseDate, quantity, pricePerUnit, totalCost });

        res.status(200).json({ success: true, message: 'Purchase record updated', data: purchase });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a purchase record
exports.deletePurchase = async (req, res) => {
    try {
        const purchase = await PurchaseHistory.findByPk(req.params.id);
        if (!purchase) {
            return res.status(404).json({ success: false, message: 'Purchase record not found' });
        }

        await purchase.destroy();
        res.status(200).json({ success: true, message: 'Purchase record deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
