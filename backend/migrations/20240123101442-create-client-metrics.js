"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("clientmetrics", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clientId: {
        type: DataTypes.INTEGER,
        references: {
          model: "clients",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      clientName: {
        type: DataTypes.STRING,
      },
      clientCPE: {
        type: DataTypes.FLOAT,
      },
      clientCPM: {
        type: DataTypes.FLOAT,
      },
      itpCPE: {
        type: DataTypes.FLOAT,
      },
      itpCPM: {
        type: DataTypes.FLOAT,
      },
      marginOfProfit: {
        type: DataTypes.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("clientmetrics");
  },
};
