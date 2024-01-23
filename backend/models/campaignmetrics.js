"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class campaignMetrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      campaignMetrics.belongsTo(models.Campaign, {
        foreignKey: "campaignId",
        as: "campaign",
        onDeleted: "CASCADE",
        onUpdate: "CASCADE",
      });

      campaignMetrics.belongsTo(models.Clients, {
        foreignKey: "clientId",
        as: "client",
        onDeleted: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  campaignMetrics.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      clientId: {
        type: DataTypes.INTEGER,
        references: {
          model: "clients",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      clientName:{
        type: DataTypes.STRING,
      },
      campaignId: {
        type: DataTypes.INTEGER,
        references: {
          model: "campaigns",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      campaignName: {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "campaignmetrics",
      modelName: "campaignMetrics",
    }
  );
  return campaignMetrics;
};
