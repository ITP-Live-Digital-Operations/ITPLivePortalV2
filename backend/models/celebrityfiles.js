'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CelebrityFiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CelebrityFiles.belongsTo(models.Celebrity, { foreignKey: 'celebrityId', as: 'celebrity' });
    }
  }
  CelebrityFiles.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    celebrityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'celebrity',
        key: 'id'
      }
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'celebrityFiles',
    modelName: 'CelebrityFiles',
  });
  return CelebrityFiles;
};