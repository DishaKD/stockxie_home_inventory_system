const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;
const User = require("./user.model");

const HealthProfile = sequelize.define(
  "HealthProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users", key: "id" },
      allowNull: false,
      onDelete: "CASCADE",
    },
    dietaryPreferences: {
      type: DataTypes.STRING, // e.g., "Vegetarian, Low-Carb"
      allowNull: true,
    },
    allergies: {
      type: DataTypes.STRING, // e.g., "Peanuts, Gluten"
      allowNull: true,
    },
    healthGoals: {
      type: DataTypes.STRING, // e.g., "Weight Loss, Muscle Gain"
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

User.hasOne(HealthProfile, { foreignKey: "userId" });
HealthProfile.belongsTo(User, { foreignKey: "userId" });

module.exports = HealthProfile;
