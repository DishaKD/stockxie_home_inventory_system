const Budget = require("../models/budget.model");

// GET current user's budget
exports.getBudget = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const budget = await Budget.findOne({ where: { userId } });
    if (!budget) return res.status(404).json({ message: "Budget not found" });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CREATE new budget
exports.createBudget = async (req, res) => {
  try {
    const { userId } = req.body;
    const { totalBudget, totalSpent = 0, month } = req.body;

    const existing = await Budget.findOne({ where: { userId, month } });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Budget already exists for this month" });
    }

    const budget = await Budget.create({
      userId,
      totalBudget,
      totalSpent,
      month,
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE budget (upsert)
exports.updateBudget = async (req, res) => {
  try {
    const { userId } = req.body;
    const { totalBudget, totalSpent, month } = req.body;

    let budget = await Budget.findOne({ where: { userId, month } });
    if (budget) {
      await budget.update({ totalBudget, totalSpent });
    } else {
      budget = await Budget.create({ userId, totalBudget, totalSpent, month });
    }

    res.json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE budget
exports.deleteBudget = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { month } = req.params;

    const budget = await Budget.findOne({ where: { userId, month } });
    if (!budget) {
      return res
        .status(404)
        .json({ message: "Budget not found for this month" });
    }

    await budget.destroy();
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET all budgets (admin use)
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.findAll();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
