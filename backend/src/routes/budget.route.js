const express = require("express");
const budgetRoutes = express.Router();
const budgetController = require("../controllers/budget.controller");
const authenticate = require("../middlewares/auth.middleware");

budgetRoutes.post("/", budgetController.createBudget);
budgetRoutes.put("/:month", budgetController.updateBudget);
budgetRoutes.get("/", authenticate, budgetController.getBudget);
budgetRoutes.delete(
  "/:month",

  budgetController.deleteBudget
);
budgetRoutes.get("/all", budgetController.getAllBudgets);

module.exports = budgetRoutes;
