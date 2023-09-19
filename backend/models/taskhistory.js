'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaskHistory.belongsTo(models.Task, {foreignKey: 'task_id', as: 'Task'})
    }
  }
  TaskHistory.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'task',
        key: 'id'
      }
    },
    round: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    feedback: {
      type: DataTypes.STRING(250),
      defaultValue: null,
    },
    notes: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  }, {
    sequelize,
    tableName: 'taskhistory',
    modelName: 'TaskHistory',
  });
  return TaskHistory;
};