"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("HealthProfiles", "age", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "gender", {
      type: Sequelize.ENUM("Male", "Female", "Other"),
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "weight", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "height", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "activityLevel", {
      type: Sequelize.ENUM(
        "Sedentary",
        "Lightly Active",
        "Moderately Active",
        "Very Active"
      ),
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "medicalConditions", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "preferredMealTypes", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "sleepHours", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });

    await queryInterface.addColumn("HealthProfiles", "waterIntake", {
      type: Sequelize.FLOAT,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("HealthProfiles", "age");
    await queryInterface.removeColumn("HealthProfiles", "gender");
    await queryInterface.removeColumn("HealthProfiles", "weight");
    await queryInterface.removeColumn("HealthProfiles", "height");
    await queryInterface.removeColumn("HealthProfiles", "activityLevel");
    await queryInterface.removeColumn("HealthProfiles", "medicalConditions");
    await queryInterface.removeColumn("HealthProfiles", "preferredMealTypes");
    await queryInterface.removeColumn("HealthProfiles", "sleepHours");
    await queryInterface.removeColumn("HealthProfiles", "waterIntake");

    // Drop ENUMs manually to avoid migration issues on re-run
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_HealthProfiles_gender";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_HealthProfiles_activityLevel";'
    );
  },
};
