'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Package.belongsTo(models.Logs, {foreignKey: 'logID'})
   
      
    }
  }
  Package.init({
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
      allowNull: true
    },
    deliverable: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'package',
    modelName: 'Package',
  });
  return Package;
};