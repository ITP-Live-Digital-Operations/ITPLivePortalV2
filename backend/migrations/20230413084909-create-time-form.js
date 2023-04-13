'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('timeform', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      Date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Agency: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Client: {
        type: DataTypes.STRING,
        allowNull: false
      },
      MainTaskType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ExtraNotes: {
        type: DataTypes.STRING,
        allowNull: false
      },
      TimeSpentInHours: {
        type: DataTypes.STRING,
        allowNull: false
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('timeform');
  }
};