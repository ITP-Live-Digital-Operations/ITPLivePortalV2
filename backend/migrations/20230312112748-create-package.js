'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Database) {
    await queryInterface.createTable('package', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      logID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'logs',
          key: 'id'
        }
      },
      platform: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      deliverable: {
        type: DataTypes.STRING(50),
        allowNull: true
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('package');
  }
};