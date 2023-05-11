'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      File.belongsTo(models.SalesBrief, { foreignKey: 'brief_id', as: 'Brief' });
      File.belongsTo(models.User, { foreignKey: 'uploaded_by', as: 'uploaded by' });  
    }
  }
  File.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    originalname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brief_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'salesbrief',
        key: 'id'
      }
    },  
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'file',
    modelName: 'File',
  });
  return File;
};