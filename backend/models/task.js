'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: 'assigned_by', as: 'Talent_Head'})
      Task.belongsTo(models.User, {foreignKey: 'assigned_to', as: 'Talent_Employee'})
      Task.hasOne(models.SalesBrief, {foreignKey: 'id', as: 'Brief'})

    }
  }
  Task.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    assigned_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    brief_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'salesbrief',
        key: 'id'
      }
    },
    deadline : {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Not Started'
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'task',
    modelName: 'Task',
  });
  return Task;
};