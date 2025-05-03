const express = require("express");
const expenseRoutes = express.Router();
const expenseController = require("../controllers/expense.controller");

expenseRoutes.get(
  "/category-expenses/:userId",
  expenseController.getCategoryExpenses
);

module.exports = expenseRoutes;
