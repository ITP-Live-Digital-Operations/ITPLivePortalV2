const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TikTokProfile extends Model {
    static associate(models) {
      TikTokProfile.belongsTo(models.Influencer, {
        foreignKey: "influencerId",
        as: "influencer",
      });
      TikTokProfile.hasMany(models.TikTokAudienceDemographic, {
        foreignKey: "tiktokProfileId",
        as: "TikTokAudienceDemographic",
      });
      TikTokProfile.hasMany(models.TikTokInterest, {
        foreignKey: "tiktokProfileId",
        as: "TikTokInterest",
      });
      TikTokProfile.hasMany(models.TikTokStatHistory, {
        foreignKey: "tiktokProfileId",
        as: "TikTokStatHistory",
      });
      TikTokProfile.hasMany(models.TikTokVideo, {
        foreignKey: "tiktokProfileId",
        as: "TikTokVideo",
      });
    }
  }
  TikTokProfile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "influencer",
          key: "id",
        },
      },
      userId: DataTypes.STRING,
      secUid: DataTypes.STRING,
      username: DataTypes.STRING,
      fullName: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      bio: DataTypes.TEXT,
      isPrivate: DataTypes.BOOLEAN,
      isVerified: DataTypes.BOOLEAN,
      followerCount: DataTypes.INTEGER,
      followingCount: DataTypes.INTEGER,
      postCount: DataTypes.INTEGER,
      avgLikes: DataTypes.FLOAT,
      avgViews: DataTypes.FLOAT,
      avgComments: DataTypes.FLOAT,
      totalLikes: DataTypes.BIGINT,
      engagementRate: DataTypes.FLOAT,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      gender: DataTypes.STRING,
      ageGroup: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TikTokProfile",
      tableName: "tiktok_profiles",
    }
  );
  return TikTokProfile;
};