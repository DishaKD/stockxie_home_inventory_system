const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;
const User = require("./user.model");

const Budget = sequelize.define(
  "Budget",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalBudget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    totalSpent: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

// Associations
Budget.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = Budget;
