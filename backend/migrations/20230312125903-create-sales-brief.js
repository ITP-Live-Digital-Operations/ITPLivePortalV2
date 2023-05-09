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
        defaultValue: null
      },
      Client: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      ClientIndustry: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      CampaignName: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      CampaignOverview: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      CampaignObjective: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      CampaignObjectiveDetails: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      NumberofRecommendations: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      Currency: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      Budget: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: null
      },
      CampaignStartDate: {
        type: DataTypes.DATEONLY,
        defaultValue: null
      },
      CampaignEndDate: {
        type: DataTypes.DATEONLY,
        defaultValue: null
      },
      CampaignMessagePhaseOne: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      CampaignMessagePhaseTwo: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      CampaignMessagePhaseThree: {
        type: DataTypes.TEXT,
        defaultValue: null
      },
      ContentDeliverables: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      BrandExclusivityDurationinDays: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      VideoProduction: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      VideoEditing: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      InfluencerAgeRange: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      InfluencerLocation: { 
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      InfluencerNationality: {
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      InfluencerGender:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      SimilarProfileLink:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      InfluencerInterest:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      InfluencerNumberOfFollowers:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      NoteForNumberOfFollowers:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      AudienceLocation:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      AudienceNationality:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      AudienceGender:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      AudienceInterest:{
        type: DataTypes.STRING(255),
        defaultValue: null
      } ,
      ConfirmedInfluencerHandles:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      PreviousBrandAmbassadorsName:{
        type: DataTypes.STRING(255),
        defaultValue: null
      },
      BudgetSheetId: {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
          model: 'file',
          key: 'id'
        }
      },
      PresentationId : {
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
          model: 'file',
          key: 'id'
        }
      },
      Assigned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      Status: {
        type: DataTypes.STRING(255),
        defaultValue: 'Active'
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
        allowNull: false,
        defaultValue: false
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