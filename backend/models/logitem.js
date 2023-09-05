'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      logItem.belongsTo(models.Logs, {foreignKey: 'logID'})
    }
  }
  logItem.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    logID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'logs',
        key: 'id'
      }
    },
    platform: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    deliverable: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },


  }, {
    sequelize,
    modelName: 'logItem',
  });
  return logItem;
};