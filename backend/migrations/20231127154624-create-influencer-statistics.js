'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('InfluencerStatistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
        type: DataTypes.DECIMAL(10,2)
      },
      influencerCost: {
        type: DataTypes.DECIMAL(10,2)
      },
      metric: {
        type: DataTypes.STRING
      },
      POC: {
        type: DataTypes.STRING
      },
      year: {
        type: DataTypes.INTEGER
      },
      campaignId: {
        type: DataTypes.INTEGER,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'influencer',
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
    await queryInterface.dropTable('InfluencerStatistics');
  }
};