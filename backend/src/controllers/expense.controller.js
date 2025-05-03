const Category = require("../models/category.model");
const Item = require("../models/item.modal");
const Budget = require("../models/budget.model");
const { Op } = require("sequelize");

const getCategoryExpenses = async (req, res) => {
  const { userId } = req.params;
  const currentMonth = new Date().toLocaleString("default", {
    month: "long",
  });

  try {
    const categories = await Category.findAll({ where: { userId } });

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found." });
    }

    const items = await Item.findAll({ where: { userId } });

    const totalSpent = items.reduce(
      (sum, item) => sum + item.itemPrice * item.quantity,
      0
    );

    // Get budget for the current month
    const budget = await Budget.findOne({
      where: { userId },
    });

    let totalBudget = 0;
    if (budget) {
      totalBudget = budget.totalBudget;

      // Update the totalSpent in the budget
      budget.totalSpent = totalSpent;
      await budget.save();
    }

    const categoryData = categories.map((category) => {
      const categoryItems = items.filter(
        (item) => item.categoryId === category.id
      );
      const categoryTotal = categoryItems.reduce(
        (sum, item) => sum + item.itemPrice * item.quantity,
        0
      );

      const percentage =
        totalBudget > 0 ? (categoryTotal / totalBudget) * 100 : 0;

      return {
        name: category.name,
        amount: parseFloat(categoryTotal.toFixed(2)),
        percentage: parseFloat(percentage.toFixed(2)),
      };
    });

    res.json({
      month: currentMonth,
      totalBudget,
      totalSpent,
      categories: categoryData,
    });
  } catch (error) {
    console.error("Error fetching category expenses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFinancialSummary = async (req, res) => {
  const { userId } = req.params;

  // Get current month name (e.g., "May")
  const now = new Date();
  const currentMonthName = now.toLocaleString("default", { month: "long" });

  try {
    // Find budget for current month and user
    const budget = await Budget.findOne({
      where: {
        userId,
        month: currentMonthName,
      },
    });

    if (!budget) {
      return res.status(404).json({ message: "No budget set for this month." });
    }

    const totalIncome = budget.totalBudget;

    // Get first and last day of the month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    // Get all items for this user created in current month
    const itemRecords = await Item.findAll({
      where: {
        userId,
        createdAt: {
          [Op.gte]: startOfMonth,
          [Op.lte]: endOfMonth,
        },
      },
    });

    // Calculate total expense from item price × quantity

    const totalExpense = budget.totalSpent;

    const savings = totalIncome - totalExpense;
    const savingsPercentage =
      totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(2) : 0;

    // Update totalSpent in budget
    budget.totalSpent = totalExpense;
    await budget.save();

    // Respond with financial summary
    res.json({
      month: currentMonthName,
      totalIncome: parseFloat(totalIncome.toFixed(2)),
      totalExpense: parseFloat(totalExpense.toFixed(2)),
      savings: parseFloat(savings.toFixed(2)),
      savingsPercentage: parseFloat(savingsPercentage),
    });
  } catch (error) {
    console.error("Error in getFinancialSummary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getCategoryExpenses,
  getFinancialSummary,
};
