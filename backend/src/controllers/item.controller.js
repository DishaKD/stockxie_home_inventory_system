const Item = require("../models/item.modal");

// Create a new item
const createItem = async (req, res) => {
  try {
    const { name, quantity, itemPrice, expiryDate, userId } = req.body;

    if (!name || !quantity || !itemPrice || !expiryDate || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = await Item.create({
      name,
      quantity,
      itemPrice,
      expiryDate,
      userId,
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all items for a specific user
const getAllItems = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const userId = req.user.id;

    const items = await Item.findAll({
      where: { userId },
      attributes: ["name", "quantity", "expiryDate"],
    });

    return res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update an item by ID
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, expiryDate, userId } = req.body;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update item fields
    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.expiryDate = expiryDate || item.expiryDate;
    item.userId = userId || item.userId;

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an item by ID
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.destroy();
    res.status(204).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Search for items by name
const searchItems = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const items = await Item.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`,
        },
      },
    });

    res.status(200).json(items);
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
};
