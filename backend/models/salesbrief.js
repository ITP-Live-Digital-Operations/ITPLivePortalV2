'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesBrief extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalesBrief.belongsTo(models.User, {foreignKey: 'CreatedbyID', as: 'user'})
      SalesBrief.hasOne(models.Task, { foreignKey: 'brief_id', as: 'task', onDelete: 'CASCADE'});
      SalesBrief.hasMany(models.File, { foreignKey: 'brief_id', as: 'files', onDelete: 'CASCADE'});
      SalesBrief.belongsTo(models.Clients, { foreignKey: 'clientId', as: 'client'})
      SalesBrief.belongsTo(models.brand, { foreignKey: 'brandId', as: 'brand'})
      SalesBrief.belongsTo(models.Campaign, {foreignKey: 'campaignId', as: 'campaign', onDelete: 'CASCADE'})
    }
  }
  SalesBrief.init({
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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id'
      }
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brand',
        key: 'id'
      }
    },
    campaignId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references : {
        model: 'campaigns',
        key: 'id'
      }
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
    InfluencerCity: {
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
    InfluencerNotes:{
      type: DataTypes.TEXT,
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
    AudienceAgeRange:{
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
    PrimaryAudienceInterest:{
      type: DataTypes.STRING(255),
      defaultValue: null
    } ,
    SecondaryAudienceInterest:{
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    ConfirmedInfluencerHandles:{
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    PreviousBrandAmbassadorsName:{
      type: DataTypes.STRING(255),
      defaultValue: null
    },
    Strategy:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Concept:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Event:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Performance :{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    BudgetSheetId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: 'file',
        key: 'id',
        onDelete: 'CASCADE'
      }
    },

    PresentationId  : {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: 'file',
        key: 'id',
        onDelete: 'CASCADE'
      }
    },

    PdfId : {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: 'file',
        key: 'id',
        onDelete: 'CASCADE'
      }
    },
    ItpDepartment: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    assigned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    KPIs: {
      type: DataTypes.STRING(255),
      defaultValue: null
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
    Priority: {
      type: DataTypes.INTEGER,
      defaultValue: 100
    },
    ResultsViewed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    signedOffByClient: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
    
  }, {
    sequelize,
    tableName: 'salesbrief',
    modelName: 'SalesBrief',
  });
  return SalesBrief;
};