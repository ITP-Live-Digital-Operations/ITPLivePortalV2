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
      SalesBrief.belongsTo(models.Task, { foreignKey: 'id', as: 'task'})
      SalesBrief.hasMany(models.File, { foreignKey: 'brief_id', as: 'files' });
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
    PresentationId  : {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: 'file',
        key: 'id'
      }
    },
    assigned: {
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
    ResultsViewed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    
  }, {
    sequelize,
    tableName: 'salesbrief',
    modelName: 'SalesBrief',
  });
  return SalesBrief;
};