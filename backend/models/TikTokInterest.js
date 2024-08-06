const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TikTokInterest extends Model {
    static associate(models) {
      TikTokInterest.belongsTo(models.TikTokProfile, {
        foreignKey: "tiktokProfileId",
        as: "tiktokProfile",
      });
    }
  }
  TikTokInterest.init(
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
      interestId: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TikTokInterest",
      tableName: "tiktok_interests",
    }
  );
  return TikTokInterest;
};