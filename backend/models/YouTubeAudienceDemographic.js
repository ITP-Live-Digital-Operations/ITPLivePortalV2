const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class YouTubeAudienceDemographic extends Model {
    static associate(models) {
      YouTubeAudienceDemographic.belongsTo(models.YouTubeProfile, {
        foreignKey: "youtubeProfileId",
        as: "youtubeProfile",
      });
    }
  }
  YouTubeAudienceDemographic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      youtubeProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "youtube_profiles",
          key: "id",
        },
      },
      type: DataTypes.STRING,
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      weight: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "YouTubeAudienceDemographic",
      tableName: "youtube_audience_demographics",
    }
  );
  return YouTubeAudienceDemographic;
};