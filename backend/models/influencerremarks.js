'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class influencerRemarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      influencerRemarks.belongsTo(models.Influencer, {foreignKey: 'influencerId', as: 'influencer'}) 
      influencerRemarks.belongsTo(models.User, {foreignKey: 'createdById', as: 'user'})
    }
  }
  influencerRemarks.init({
    id : {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    influencerId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'influencer',
        key: 'id'
      }
    },
    createdById:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    note:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    
  }, {
    sequelize,
    tableName: 'influencerremarks',
    modelName: 'influencerRemarks',
  });
  return influencerRemarks;
};