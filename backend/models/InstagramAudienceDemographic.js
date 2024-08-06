const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramAudienceDemographic extends Model {
    static associate(models) {
      InstagramAudienceDemographic.belongsTo(models.InstagramProfile, {
        foreignKey: "instagramProfileId",
        as: "instagramProfile",
      });
    }
  }
  InstagramAudienceDemographic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      instagramProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "instagram_profiles",
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
      modelName: "InstagramAudienceDemographic",
      tableName: "instagram_audience_demographics",
    }
  );
  return InstagramAudienceDemographic;
};