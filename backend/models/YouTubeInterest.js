const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class YouTubeInterest extends Model {
    static associate(models) {
      YouTubeInterest.belongsTo(models.YouTubeProfile, {
        foreignKey: "youtubeProfileId",
        as: "youtubeProfile",
      });
    }
  }
  YouTubeInterest.init(
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
      interestId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "YouTubeInterest",
      tableName: "youtube_interests",
    }
  );
  return YouTubeInterest;
};