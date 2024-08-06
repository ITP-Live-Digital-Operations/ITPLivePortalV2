const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramBrandAffinity extends Model {
    static associate(models) {
      InstagramBrandAffinity.belongsTo(models.InstagramProfile, {
        foreignKey: "instagramProfileId",
        as: "instagramProfile",
      });
    }
  }
  InstagramBrandAffinity.init(
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
      brandId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      weight: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "InstagramBrandAffinity",
      tableName: "instagram_brand_affinities",
    }
  );
  return InstagramBrandAffinity;
};
