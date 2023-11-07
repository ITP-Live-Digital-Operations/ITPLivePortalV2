'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      campaignName: {
        type: DataTypes.STRING
      },
      clientName: {
        type: DataTypes.STRING
      },
      market: {
        type: DataTypes.STRING
      },
      clientIndustry: {
        type: DataTypes.STRING
      },
      influencerName: {
        type: DataTypes.STRING
      },
      influencerVertical: {
        type: DataTypes.STRING
      },
      platform: {
        type: DataTypes.STRING
      },
      deliverable: {
        type: DataTypes.STRING
      },
      followers: {
        type: DataTypes.INTEGER
      },
      reach: {
        type: DataTypes.INTEGER
      },
      impressions: {
        type: DataTypes.INTEGER
      },
      interactions: {
        type: DataTypes.INTEGER
      },
      clientCost: {
        type: DataTypes.DECIMAL(5,2)
      },
      influencerCost: {
        type: DataTypes.DECIMAL(5,2)
      },
      metric: {
        type: DataTypes.STRING
      },
      poc: {
        type: DataTypes.STRING
      },
      year: {
        type: DataTypes.INTEGER
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
    await queryInterface.dropTable('Campaigns');
  }
};