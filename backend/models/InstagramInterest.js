const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramInterest extends Model {
    static associate(models) {
      InstagramInterest.belongsTo(models.InstagramProfile, {
        foreignKey: "instagramProfileId",
        as: "instagramProfile",
      });
    }
  }
  InstagramInterest.init(
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
      interestId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      weight: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "InstagramInterest",
      tableName: "instagram_interests",
    }
  );
  return InstagramInterest;
};