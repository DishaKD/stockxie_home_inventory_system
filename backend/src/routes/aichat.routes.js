const express = require("express");
const aiRoutes = express.Router();
const { getAIResponse } = require("../services/groqService");
const { getAllItems } = require("../controllers/item.controller");
const authenticateUser = require("../middlewares/auth.middleware");

aiRoutes.get("/recipes", authenticateUser, async (req, res) => {
  try {
    const items = await getAllItems(req);

    if (!items || items.length === 0) {
      return res.status(404).json({ error: "No items found in inventory." });
    }

    // Convert items to ingredient list
    const ingredients = items.map((item) => item.name).join(", ");

    // Construct AI prompt
    const messages = [
      {
        role: "system",
        content: "You are NutriSense AI, an intelligent food assistant.",
      },
      {
        role: "user",
        content: `Based on my available ingredients: ${ingredients}, suggest healthy recipes.`,
      },
    ];

    // Call AI response function
    const response = await getAIResponse(messages);

    // ✅ Send the AI response
    res.json({ recipes: response });
  } catch (error) {
    console.error("Error generating recipes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = aiRoutes;
