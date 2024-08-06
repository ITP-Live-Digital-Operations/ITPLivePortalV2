const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramHashtag extends Model {
    static associate(models) {
      InstagramHashtag.belongsTo(models.InstagramProfile, {
        foreignKey: "instagramProfileId",
        as: "instagramProfile",
      });
    }
  }
  InstagramHashtag.init(
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
      tag: DataTypes.STRING,
      weight: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "InstagramHashtag",
      tableName: "instagram_hashtags",
    }
  );
  return InstagramHashtag;
};