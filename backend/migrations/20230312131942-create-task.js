'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('task', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      assigned_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      brief_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'salesbrief',
          key: 'id'
        }
      },
      deadline : {
        type: DataTypes.DATE,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Not Started'
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      progress: {
        type: DataTypes.STRING(50),
        defaultValue: "In Progress",
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('task');
  }
};