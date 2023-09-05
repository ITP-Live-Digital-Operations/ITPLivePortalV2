'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Logs.belongsTo(models.User, {foreignKey: 'userID'})
      Logs.belongsTo(models.Influencer, {foreignKey: 'influencerID'})
      Logs.hasMany(models.logItem, { foreignKey: 'logID', as: 'logItems', onDelete: 'CASCADE'});
      Logs.hasMany(models.Package, { foreignKey: 'logID', as: 'packages', onDelete: 'CASCADE'});
     

    }
  }
  Logs.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    influencerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'influencer',
        key: 'ID'
      }
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    campaign: {
      type: DataTypes.STRING(100),
      allowNull: false
    },

    datecreated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    time_to_reply: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    // Only for package type logs
    currency: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    rate: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true 
    },
    // Only for package type logs
  }, {
    sequelize,
    tableName: 'logs',
    modelName: 'Logs',
  });
  return Logs;
};