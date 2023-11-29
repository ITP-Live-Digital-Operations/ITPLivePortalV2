'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Campaign.belongsTo(models.Clients, {foreignKey: 'clientId', as: 'client'})
        Campaign.belongsToMany(models.Influencer, {through: 'influencer_campaign'})
        
      }
  }
  Campaign.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    campaignName: {
      type: DataTypes.STRING
    },
    market: {
      type: DataTypes.STRING
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'clients',
        key: 'id'
      }
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
    modelName: 'Campaign',
    tableName: 'campaigns'
  });
  return Campaign;
};