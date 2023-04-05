'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      influencerID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'influencer',
          key: 'ID'
        }
      },
      campaign: {
        type: DataTypes.STRING(100),
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
      datecreated: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      time_to_reply: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('logs');
  }
};