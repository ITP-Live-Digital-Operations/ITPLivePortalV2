"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class influencerMetrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      influencerMetrics.belongsTo(models.Influencer, {
        foreignKey: "influencerId",
        as: "influencer",
        onDeleted: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  influencerMetrics.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        references: {
          model: "influencer",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      influencerName: {
        type: DataTypes.STRING,
      },
      CPE: {
        type: DataTypes.FLOAT,
      },
      CPM: {
        type: DataTypes.FLOAT,
      },
      marginOfProfit: {
        type: DataTypes.FLOAT,
      },

      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "influencermetrics",
      modelName: "influencerMetrics",
    }
  );
  return influencerMetrics;
};
