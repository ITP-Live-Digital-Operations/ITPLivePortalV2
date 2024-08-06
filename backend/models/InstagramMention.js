const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramMention extends Model {
    static associate(models) {
      InstagramMention.belongsTo(models.InstagramProfile, {
        foreignKey: "instagramProfileId",
        as: "instagramProfile",
      });
    }
  }
  InstagramMention.init(
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
      modelName: "InstagramMention",
      tableName: "instagram_mentions",
    }
  );
  return InstagramMention;
};