const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TikTokVideo extends Model {
    static associate(models) {
      TikTokVideo.belongsTo(models.TikTokProfile, {
        foreignKey: "tiktokProfileId",
        as: "tiktokProfile",
      });
    }
  }
  TikTokVideo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tiktokProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "tiktok_profiles",
          key: "id",
        },
      },
      videoId: DataTypes.STRING,
      text: DataTypes.TEXT,
      url: DataTypes.STRING,
      created: DataTypes.DATE,
      thumbnail: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      comments: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
      video: DataTypes.STRING,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TikTokVideo",
      tableName: "tiktok_videos",
    }
  );
  return TikTokVideo;
};