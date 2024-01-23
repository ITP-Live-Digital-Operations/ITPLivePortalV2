'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Clients.hasMany(models.brand, {
        foreignKey: 'clientId',
        as: 'brands',
        onDelete: 'CASCADE'
      })

      Clients.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'user',
        onDelete: 'CASCADE'
      })

      Clients.hasOne(models.clientMetrics, {
        foreignKey: 'clientId',
        as: 'clientMetrics',
        onDelete: 'CASCADE'
      })
    }
  }
  Clients.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name : {
      type: DataTypes.STRING,
      allowNull: false
    },
    industry : {
      type: DataTypes.STRING,
      allowNull: false
    },
    pocName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pocEmail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pocNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      defaultValue: 1
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'clients',
    modelName: 'Clients',
  });
  return Clients;
};