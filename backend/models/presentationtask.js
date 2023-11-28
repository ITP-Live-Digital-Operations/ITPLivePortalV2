'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class presentationTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  presentationTask.init({
    taskId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'presentationtasks',
    modelName: 'presentationTask',
  });
  return presentationTask;
};