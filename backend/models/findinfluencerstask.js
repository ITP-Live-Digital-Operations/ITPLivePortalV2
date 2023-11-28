'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FindInfluencersTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FindInfluencersTask.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    taskId: {
      type: DataTypes.INTEGER,
    },
    influencer : {
      type: DataTypes.STRING,
    },
    
  }, {
    sequelize,
    tableName: 'findinfluencerstasks',
    modelName: 'FindInfluencersTask',
  });
  return FindInfluencersTask;
};