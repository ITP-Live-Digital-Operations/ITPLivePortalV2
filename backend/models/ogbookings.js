'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ogbookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ogbookings.belongsTo(models.User, {foreignKey: 'staffId'})
      ogbookings.belongsTo(models.ogshows, {foreignKey: 'showId'})
    }
  }
  ogbookings.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    showId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ogshows',
        key: 'id'
      }
    },
    team: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shootName : {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    guestNames: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    startingDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endingDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    progress : {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    notes : {
      type: DataTypes.TEXT,
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'ogbookings',
    modelName: 'ogbookings',
  });
  return ogbookings;
};