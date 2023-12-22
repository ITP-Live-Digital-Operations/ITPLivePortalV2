'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deliverables extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Deliverables.belongsTo(models.Platforms, {
        foreignKey: 'platformId', // Assuming the foreign key in Deliverables table is 'platformId'
        as: 'platform', // Alias for easier querying
      });
    }
  }
  Deliverables.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    platformId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Platforms',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING
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
    modelName: 'Deliverables',
    tableName: 'deliverables'
  });
  return Deliverables;
};