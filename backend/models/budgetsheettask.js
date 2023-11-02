'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class budgetSheetTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  budgetSheetTask.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  /*   taskId: {
      type: DataTypes.INTEGER,
      references : {
        model: 'tasks',
        key: 'id'
      }
    },
    budgetSheetId1: {
      type: DataTypes.INTEGER,
      references : {
        model: 'file',
        key: 'id'
      }
    },
    budgetSheetId2: {
      type: DataTypes.INTEGER,
      references : {
        model: 'file',
        key: 'id'
      }
    },
    presentationId1: {
      type: DataTypes.INTEGER,
      references : {
        model: 'file',
        key: 'id'
      }
    },
    presentationId2: {
      type: DataTypes.INTEGER,
      references : {
        model: 'file',
        key: 'id'
      }
    },
    pdfId1  : {
      type: DataTypes.INTEGER,
      references : {
        model: 'file',
        key: 'id'
      }
    },
    pdfId2 : {
      type: DataTypes.INTEGER,
      references : {
        model: 'file',
        key: 'id'
      }
    }, */
  }, {
    sequelize,
    tableName: 'budgetSheetTasks',
    modelName: 'budgetSheetTask',
  });
  return budgetSheetTask;
};