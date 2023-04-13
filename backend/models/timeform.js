'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TimeForm.belongsTo(models.User, { foreignKey: 'user_id' });

    }
  }
  TimeForm.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Agency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Client: {
      type: DataTypes.STRING,
      allowNull: false
    },
    MainTaskType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ExtraNotes: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TimeSpentInHours: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }

  }, {
    sequelize,
    tableName: 'timeform',
    modelName: 'TimeForm',
  });
  return TimeForm;
};