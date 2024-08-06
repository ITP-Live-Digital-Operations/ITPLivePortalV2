const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class InstagramStatHistory extends Model {
    static associate(models) {
      InstagramStatHistory.belongsTo(models.InstagramProfile, {
        foreignKey: "instagramProfileId",
        as: "instagramProfile",
      });
    }
  }
  InstagramStatHistory.init(
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
      month: DataTypes.DATE,
      followers: DataTypes.INTEGER,
      following: DataTypes.INTEGER,
      avgLikes: DataTypes.FLOAT,
      avgViews: DataTypes.FLOAT,
      avgComments: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "InstagramStatHistory",
      tableName: "instagram_stat_history",
    }
  );
  return InstagramStatHistory;
};