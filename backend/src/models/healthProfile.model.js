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
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activityLevel: {
      type: DataTypes.ENUM(
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active"
      ),
      allowNull: true,
    },
    medicalConditions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredMealTypes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dietaryPreferences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    allergies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    healthGoals: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sleepHours: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    waterIntake: {
      type: DataTypes.FLOAT,
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
