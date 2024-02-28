'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ogshows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ogshows.init({
    id :{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    color : {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    colorCode : {
      type: DataTypes.STRING(20),
      allowNull: true
    },

  }, {
    sequelize,
    tableName: 'ogshows',
    modelName: 'ogshows',
  });
  return ogshows;
};