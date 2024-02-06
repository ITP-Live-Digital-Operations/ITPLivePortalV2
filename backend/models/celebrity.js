'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Celebrity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Celebrity.belongsTo(models.User, {foreignKey: 'updatedBy', as: 'user'})
    }
  }
  Celebrity.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Gender: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Number: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MainContentLanguage: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MainVertical: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Occupation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Nationality: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    CountryLocation: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    InstagramHandle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    InstagramFollowers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    InstagramLink: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    TiktokHandle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TiktokFollowers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TiktokLink: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    TwitterHandle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TwitterFollowers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TwitterLink: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    YoutubeHandle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    YoutubeFollowers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    YoutubeLink: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    TwitchHandle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TwitchFollowers: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TwitchLink: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Agency : {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    AgencyContactPerson: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    AgencyNumber: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    AgencyEmail: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PreviousBrands: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    PreviouslyWorkedWith: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(10),
      defaultValue: "Active"
    },
    Game : {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'celebrity',
    modelName: 'Celebrity',
  });
  return Celebrity;
};