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
      type: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      campaign: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      time_to_reply: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      // Only for package type logs
      currency: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      rate: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
      },
      // Only for package type logs
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('logs');
  }
};