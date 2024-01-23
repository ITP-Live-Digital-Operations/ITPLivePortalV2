"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class clientMetrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      clientMetrics.belongsTo(models.Clients, {
        foreignKey: "clientId",
        as: "client",
        onDeleted: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  clientMetrics.init(
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
      clientName: {
        type: DataTypes.STRING,
      },
      clientCPE: {
        type: DataTypes.FLOAT,
      },
      clientCPM: {
        type: DataTypes.FLOAT,
      },
      itpCPE: {
        type: DataTypes.FLOAT,
      },
      itpCPM: {
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
      tableName: "clientMetrics",
      modelName: "clientMetrics",
    }
  );
  return clientMetrics;
};
