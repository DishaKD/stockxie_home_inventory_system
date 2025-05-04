// routes/healthProfile.routes.js
const express = require("express");
const healthProfileRoutes = express.Router();
const controller = require("../controllers/healthProfile.controller");

healthProfileRoutes.post("/", controller.createHealthProfile);
healthProfileRoutes.get("/", controller.getAllHealthProfiles);
healthProfileRoutes.get("/:userId", controller.getHealthProfileByUserId);
healthProfileRoutes.put("/:userId", controller.updateHealthProfile);
healthProfileRoutes.delete("/:userId", controller.deleteHealthProfile);

module.exports = healthProfileRoutes;
