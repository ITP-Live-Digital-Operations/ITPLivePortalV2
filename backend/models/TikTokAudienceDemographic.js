const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TikTokAudienceDemographic extends Model {
    static associate(models) {
      TikTokAudienceDemographic.belongsTo(models.TikTokProfile, {
        foreignKey: "tiktokProfileId",
        as: "tiktokProfile",
      });
    }
  }
  TikTokAudienceDemographic.init(
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
      type: DataTypes.STRING,
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      weight: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "TikTokAudienceDemographic",
      tableName: "tiktok_audience_demographics",
    }
  );
  return TikTokAudienceDemographic;
};