const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class YouTubeStatHistory extends Model {
    static associate(models) {
      YouTubeStatHistory.belongsTo(models.YouTubeProfile, {
        foreignKey: "youtubeProfileId",
        as: "youtubeProfile",
      });
    }
  }
  YouTubeStatHistory.init(
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
      month: DataTypes.DATE,
      followers: DataTypes.INTEGER,
      following: DataTypes.INTEGER,
      avgLikes: DataTypes.FLOAT,
      avgViews: DataTypes.FLOAT,
      avgComments: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "YouTubeStatHistory",
      tableName: "youtube_stat_history",
    }
  );
  return YouTubeStatHistory;
};