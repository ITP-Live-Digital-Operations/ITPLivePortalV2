const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class YouTubeProfile extends Model {
    static associate(models) {
      YouTubeProfile.belongsTo(models.Influencer, {
        foreignKey: "influencerId",
        as: "influencer",
      });
      YouTubeProfile.hasMany(models.YouTubeAudienceDemographic, {
        foreignKey: "youtubeProfileId",
        as: "YouTubeAudienceDemographic",
      });
      YouTubeProfile.hasMany(models.YouTubeInterest, {
        foreignKey: "youtubeProfileId",
        as: "YouTubeInterest",
      });
      YouTubeProfile.hasMany(models.YouTubeStatHistory, {
        foreignKey: "youtubeProfileId",
        as: "YouTubeStatHistory",
      });
      YouTubeProfile.hasMany(models.YouTubeVideo, {
        foreignKey: "youtubeProfileId",
        as: "YouTubeVideo",
      });
    }
  }
  YouTubeProfile.init(
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
      username: DataTypes.STRING,
      fullName: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      description: DataTypes.TEXT,
      isVerified: DataTypes.BOOLEAN,
      subscriberCount: DataTypes.INTEGER,
      videoCount: DataTypes.INTEGER,
      avgViews: DataTypes.FLOAT,
      avgLikes: DataTypes.FLOAT,
      avgComments: DataTypes.FLOAT,
      totalViews: DataTypes.BIGINT,
      engagementRate: DataTypes.FLOAT,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      gender: DataTypes.STRING,
      ageGroup: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "YouTubeProfile",
      tableName: "youtube_profiles",
    }
  );
  return YouTubeProfile;
};