const Category = require("../models/category.model");
const Item = require("../models/item.modal");
const Budget = require("../models/budget.model");

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

module.exports = {
  getCategoryExpenses,
};
