const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class YouTubeVideo extends Model {
    static associate(models) {
      YouTubeVideo.belongsTo(models.YouTubeProfile, {
        foreignKey: "youtubeProfileId",
        as: "youtubeProfile",
      });
    }
  }
  YouTubeVideo.init(
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
      videoId: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      url: DataTypes.STRING,
      created: DataTypes.DATE,
      thumbnail: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      comments: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "YouTubeVideo",
      tableName: "youtube_videos",
    }
  );
  return YouTubeVideo;
};