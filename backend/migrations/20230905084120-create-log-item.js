'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('logItem', {
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
        allowNull: false
      },
      deliverable: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      currency: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      rate: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('logItem');
  }
};