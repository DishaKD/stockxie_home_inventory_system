const Item = require("../models/item.modal");
const Category = require("../models/category.model");
const { Op } = require("sequelize");

// Create a new item
const createItem = async (req, res) => {
  try {
    const { name, quantity, itemPrice, expiryDate, userId, categoryId } =
      req.body;

    if (
      !name ||
      !quantity ||
      !itemPrice ||
      !expiryDate ||
      !userId ||
      !categoryId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = await Item.create({
      name,
      quantity,
      itemPrice,
      expiryDate,
      userId,
      categoryId,
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
      attributes: ["id", "name", "quantity", "expiryDate", "categoryId"],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
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
    const { name, quantity, expiryDate, userId, categoryId } = req.body;

    const item = await Item.findByPk(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Update item fields
    item.name = name || item.name;
    item.quantity = quantity || item.quantity;
    item.expiryDate = expiryDate || item.expiryDate;
    item.userId = userId || item.userId;
    item.categoryId = categoryId || item.categoryId;

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

    const item = await Item.findByPk(id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

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

const searchItems = async (req, res) => {
  try {
    const { query } = req.query; // Get the query from the request

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const userId = req.user.id; // Get the user ID from the request (assuming you're handling authentication)

    console.log("Received search query:", query);

    // Search for items in the database that match the query in their name and belong to the current user
    const items = await Item.findAll({
      where: {
        name: {
          [Op.like]: `%${query.trim()}%`, // Use LIKE for partial matching
        },
        userId, // Ensure the item belongs to the current user
      },
      attributes: ["id", "name", "quantity", "expiryDate", "categoryId"], // Specify the attributes to return
      include: [
        {
          model: Category, // Include the associated Category model
          as: "category", // Alias for the relationship
          attributes: ["name"], // Only return the category name
        },
      ],
    });

    console.log("Found items:", items);

    // If no items were found, return a 404 response
    if (items.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Return the found items in the response
    res.status(200).json(items);
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getItemsForRecipes = async (req) => {
  if (!req.user || !req.user.id) {
    throw new Error("Unauthorized: User not found");
  }

  const userId = req.user.id;

  const items = await Item.findAll({
    where: { userId },
    attributes: ["id", "name", "quantity", "expiryDate", "categoryId"],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["name"],
      },
    ],
  });

  return items;
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
  getItemsForRecipes,
};
