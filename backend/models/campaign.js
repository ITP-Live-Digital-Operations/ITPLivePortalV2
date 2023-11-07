'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Campaign.init({
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
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};