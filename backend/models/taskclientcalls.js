'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskClientCalls extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      taskClientCalls.belongsTo(models.Task, {
        foreignKey: 'taskId',
        as: 'task',
      });
    }
  }
  taskClientCalls.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    introCheck: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false, 
    },
    introDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    introNotes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    briefCheck: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    briefDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    briefNotes: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    presentationCheck : {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    presentationDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    presentationNotes: {
      type: DataTypes.TEXT,
      defaultValue: '',
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
    modelName: 'taskClientCalls',
    tableName: 'taskClientCalls',
  });
  return taskClientCalls;
};