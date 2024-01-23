"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("influencerMetrics", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      influencerId: {
        type: DataTypes.INTEGER,

        references: {
          model: "influencer",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      influencerName: {
        type: DataTypes.STRING,
      },
      CPE: {
        type: DataTypes.FLOAT,
      },
      CPM: {
        type: DataTypes.FLOAT,
      },
      profitOfMargin: {
        type: DataTypes.FLOAT,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("influencerMetrics");
  },
};
