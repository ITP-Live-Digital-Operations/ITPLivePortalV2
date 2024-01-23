'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class influencerCampaignMetrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        influencerCampaignMetrics.belongsTo(models.Campaign, {
          foreignKey: "campaignId",
          as: "campaign",
          onDeleted: "CASCADE",
          onUpdate: "CASCADE",
        });
  
        influencerCampaignMetrics.belongsTo(models.Influencer, {
          foreignKey: "influencerId",
          as: "influencer",
          onDeleted: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }
  influencerCampaignMetrics.init({
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
  }, {
    sequelize,
    tableName : 'influencerCampaignMetrics',
    modelName: 'influencerCampaignMetrics',
  });
  return influencerCampaignMetrics;
};