'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log_package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Log_package.belongsTo(models.Logs, {foreignKey: 'logID', as: 'log'})
      Log_package.belongsTo(models.Package, {foreignKey: 'packageID', as: 'package'})
    }
  }
  Log_package.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    logID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'logs',
        key: 'id'
      }
    },
    packageID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'package',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'log_packages',
    modelName: 'Log_package',
  });
  return Log_package;
};