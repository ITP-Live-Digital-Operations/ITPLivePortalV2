'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('influencerCampaignMetrics', {
      id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      campaignId: {
        type: DataTypes.INTEGER,
        references: {
          model: "campaigns",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      campaignName:{
        type: DataTypes.STRING,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "influencer",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      influencerName: {
        type: DataTypes.STRING,
      },
      CPE : {
        type: DataTypes.FLOAT,
      },
      CPM : {
        type: DataTypes.FLOAT,
      },
      marginOfProfit : {
        type: DataTypes.FLOAT,
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
    await queryInterface.dropTable('influencerCampaignMetrics');
  }
};