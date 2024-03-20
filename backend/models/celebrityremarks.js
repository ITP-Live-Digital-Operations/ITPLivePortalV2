"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class celebrityRemarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      celebrityRemarks.belongsTo(models.Celebrity, {
        foreignKey: "celebrityId",
        as: "celebrity",
      });
      influencerRemarks.belongsTo(models.User, {
        foreignKey: "createdById",
        as: "user",
      });
    }
  }
  celebrityRemarks.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      celebrityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "celebrity",
          key: "id",
        },
      },
      createdById: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "celebrityremarks",
      modelName: "celebrityRemarks",
    }
  );
  return celebrityRemarks;
};
