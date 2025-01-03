'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('clients', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name : {
        type: DataTypes.STRING,
        allowNull: false
      },
      industry : {
        type: DataTypes.STRING,
        allowNull: false
      },
      pocName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pocEmail: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pocNumber: {
        type: DataTypes.STRING,
        allowNull: true
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        defaultValue: 1
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
    await queryInterface.dropTable('clients');
  }
};