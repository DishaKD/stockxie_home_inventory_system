const express = require("express");
const aiRoutes = express.Router();
const { getAIResponse } = require("../services/groqService");
const { getItemsForRecipes } = require("../controllers/item.controller");
const authenticateUser = require("../middlewares/auth.middleware");

aiRoutes.get("/recipes", authenticateUser, async (req, res) => {
  try {
    const items = await getItemsForRecipes(req);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(404).json({ error: "No items found in inventory." });
    }

    const ingredients = items.map((item) => item.name).join(", ");

    const messages = [
      {
        role: "system",
        content: `You are NutriSense AI, an intelligent food assistant. Respond with exactly 3 healthy recipe suggestions in valid JSON array format. Each recipe must include:
    - "id": a unique number,
    - "title": the recipe name,
    - "description": a brief explanation,
    - "imageUrl": a **relevant food-related image** from Pexels urls
    Do NOT include any extra explanation or markdown—only return pure JSON.`,
      },
      {
        role: "user",
        content: `Here are my ingredients: ${ingredients}. Suggest 3 recipes.`,
      },
    ];

    const responseText = await getAIResponse(messages);

    // Parse AI response to JSON
    let recipeArray;
    try {
      recipeArray = JSON.parse(responseText);
    } catch (err) {
      console.error("Failed to parse AI JSON:", err);
      return res.status(500).json({ error: "AI response was not valid JSON." });
    }

    res.json(recipeArray); // Now response is an array, not an object
  } catch (error) {
    console.error("Error generating recipes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = aiRoutes;
