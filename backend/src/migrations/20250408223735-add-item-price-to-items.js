"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add 'itemPrice' column
    await queryInterface.addColumn("Items", "itemPrice", {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });

    // Add 'categoryId' column
    await queryInterface.addColumn("Items", "categoryId", {
      type: Sequelize.INTEGER,
      references: { model: "Categories", key: "id" },
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove 'itemPrice' and 'categoryId' columns
    await queryInterface.removeColumn("Items", "itemPrice");
    await queryInterface.removeColumn("Items", "categoryId");
  },
};
