const Category = require("../models/category.model");
const User = require("../models/user.model");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id; // Assuming user is authenticated and stored in `req.user`

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }

    const category = await Category.create({ name, userId });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all categories for a user
exports.getCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await Category.findAll({ where: { userId } });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    const category = await Category.findOne({ where: { id, userId } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const category = await Category.findOne({ where: { id, userId } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
