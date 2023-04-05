'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('salesbrief', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Agency: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      Client: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      ClientIndustry: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      CampaignName: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      CampaignOverview: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      CampaignObjective: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      CampaignObjectiveDetails: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      NumberofRecommendations: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Currency: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      Budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      CreatedbyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      ViewedByTalent: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      Ready: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      
      created_at: {
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
    await queryInterface.dropTable('Salesbrief');
  }
};