'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('taskhistory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      task_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'task',
          key: 'id'
        }
      },
      round: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      feedback: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      notes: {
        type: DataTypes.TEXT,
        defaultValue: null,
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
    await queryInterface.dropTable('taskhistory');
  }
};