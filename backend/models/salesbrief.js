'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesBrief extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SalesBrief.belongsTo(models.User, {foreignKey: 'CreatedbyID', as: 'user'})
      SalesBrief.belongsTo(models.Task, { foreignKey: 'id', as: 'task'})
    }
  }
  SalesBrief.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Agency: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Client: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ClientIndustry: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CampaignName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CampaignOverview: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    CampaignObjective: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    CampaignObjectiveDetails: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    NumberofRecommendations: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Currency: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Budget: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    CreatedbyID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    ViewedByTalent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    Ready: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    
  }, {
    sequelize,
    tableName: 'salesbrief',
    modelName: 'SalesBrief',
  });
  return SalesBrief;
};