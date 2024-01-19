"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InfluencerStatistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      InfluencerStatistics.belongsTo(models.Influencer, {
        foreignKey: "influencerId",
        as: "influencer",
      });
      InfluencerStatistics.belongsTo(models.Campaign, {
        foreignKey: "campaignId",
        as: "campaign",
      });
    }
  }
  InfluencerStatistics.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      platform: {
        type: DataTypes.STRING,
      },
      deliverable: {
        type: DataTypes.STRING,
      },
      followers: {
        type: DataTypes.INTEGER,
      },
      reach: {
        type: DataTypes.INTEGER,
      },
      impressions: {
        type: DataTypes.INTEGER,
      },
      likes: {
        type: DataTypes.INTEGER,
      },
      comments: {
        type: DataTypes.INTEGER,
      },
      shares: {
        type: DataTypes.INTEGER,
      },
      saves: {
        type: DataTypes.INTEGER,
      },
      subscribers: {
        type: DataTypes.INTEGER,
      },
      videoViews: {
        type: DataTypes.INTEGER,
      },
      uniqueViewers: {
        type: DataTypes.INTEGER,
      },
      dislikes: {
        type: DataTypes.INTEGER,
      },
      interactions:{
        type: DataTypes.INTEGER,
      },
      totalInteractions: {
        type: DataTypes.INTEGER,
      },
      retweets: {
        type: DataTypes.INTEGER,
      },
      views: {
        type: DataTypes.INTEGER,
      },
      stickerTaps: {
        type: DataTypes.INTEGER,
      },
      linkClicks: {
        type: DataTypes.INTEGER,
      },
      viewers: {
        type: DataTypes.INTEGER,
      },
      screenshots: {
        type: DataTypes.INTEGER,
      },
      replies: {
        type: DataTypes.INTEGER,
      },
      clicks: {
        type: DataTypes.INTEGER,
      },
      engagementRate: {
        type: DataTypes.DECIMAL(10, 2),
      },
      margin: {
        type: DataTypes.DECIMAL(10, 2),
      },
      frame: {
        type: DataTypes.INTEGER,
      },
      setNumber: {
        type: DataTypes.INTEGER,
      },
      clientCost: {
        type: DataTypes.DECIMAL(10, 2),
      },
      influencerCost: {
        type: DataTypes.DECIMAL(10, 2),
      },
      metric: {
        type: DataTypes.STRING,
      },
      POC: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      campaignId: {
        type: DataTypes.INTEGER,
        references: {
          model: "campaigns",
          key: "id",
        },
      },
      influencerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "influencer",
          key: "id",
        },
      },
      portalInput: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "influencerstatistics",
      modelName: "InfluencerStatistics",
    }
  );
  return InfluencerStatistics;
};
