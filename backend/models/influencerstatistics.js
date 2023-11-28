'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InfluencerStatistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfluencerStatistics.belongsTo(models.Influencer, {foreignKey: 'influencerId', as: 'influencer'})
  
    }
  }
  InfluencerStatistics.init({
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
  }, {
    sequelize,
    tableName: 'influencerstatistics',
    modelName: 'InfluencerStatistics',
  });
  return InfluencerStatistics;
};