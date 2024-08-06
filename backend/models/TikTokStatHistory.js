const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TikTokStatHistory extends Model {
    static associate(models) {
      TikTokStatHistory.belongsTo(models.TikTokProfile, {
        foreignKey: "tiktokProfileId",
        as: "tiktokProfile",
      });
    }
  }
  TikTokStatHistory.init(
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
      month: DataTypes.DATE,
      followers: DataTypes.INTEGER,
      following: DataTypes.INTEGER,
      avgLikes: DataTypes.FLOAT,
      avgViews: DataTypes.FLOAT,
      avgComments: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "TikTokStatHistory",
      tableName: "tiktok_stat_history",
    }
  );
  return TikTokStatHistory;
};