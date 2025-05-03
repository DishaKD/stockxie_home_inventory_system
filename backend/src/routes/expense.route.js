const express = require("express");
const expenseRoutes = express.Router();
const expenseController = require("../controllers/expense.controller");

expenseRoutes.get(
  "/category-expenses/:userId",
  expenseController.getCategoryExpenses
);

expenseRoutes.get("/summary/:userId", expenseController.getFinancialSummary);

module.exports = expenseRoutes;
