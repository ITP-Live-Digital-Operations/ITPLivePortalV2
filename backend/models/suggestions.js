'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suggestions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Suggestions.belongsTo(models.User, {
        foreignKey: "suggestedBy",
        as: "user",
      });
    }
  }
  Suggestions.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    suggestion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estimatedTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    suggestedBy: {
      type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: true,

    },
    
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING'
    }
  }, {
    sequelize,
    modelName: 'Suggestions',
    tableName: 'suggestions',
  });
  return Suggestions;
};