"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TikTokProfile extends Model {
    static associate(models) {
      TikTokProfile.belongsTo(models.Influencer, {
        foreignKey: "influencerId",
        as: "influencer",
      });
    }
  }
  TikTokProfile.init(
    {
      influencerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "influencer",
          key: "id",
        },
      },
      username: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      followers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      avgLikes: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      avgComments: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      avgViews: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      engagementRate: {
        type: DataTypes.FLOAT,
        defaultValue: null,
      },
      profileUrl: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      secUid: {
        type: DataTypes.STRING(100),
        defaultValue: null,
      },
      totalLikes: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      postsCount: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      sequelize,
      tableName: "tiktok_profiles",
      modelName: "TikTokProfile",
    }
  );
  return TikTokProfile;
};