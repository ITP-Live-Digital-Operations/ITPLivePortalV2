'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InfluencerRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfluencerRating.belongsTo(models.Influencer, {foreignKey: 'influencer_id', as: 'influencerID'}) 
      InfluencerRating.belongsTo(models.User, {foreignKey: 'createdBy_id', as: 'userID'})
    }
  }
  InfluencerRating.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    influencer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'influencer',
        key: 'id'
      } 
    },
    responseRate: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    contentQuality: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    creativity: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    flexibility: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    campaignPerformance: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    notes:{
      type: DataTypes.TEXT,
      defaultValue: null
    },
    createdBy_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },

  },
  
  
  
  {
    sequelize,
    tableName: 'influencerRating',
    modelName: 'InfluencerRating',
  });
  return InfluencerRating;
};