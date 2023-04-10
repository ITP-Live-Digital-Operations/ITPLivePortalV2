'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('log_packages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      logID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'logs',
          key: 'id'
        }
      },
      packageID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'package',
          key: 'id'
        }
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
    await queryInterface.dropTable('Log_packages');
  }
};