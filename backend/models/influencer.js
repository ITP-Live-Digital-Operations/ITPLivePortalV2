'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Influencer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Influencer.belongsTo(models.User, {foreignKey: 'updatedBy', as: 'user'})
      Influencer.hasMany(models.Logs, {foreignKey: 'influencerID', as: 'influencer'})
    }

  }
  Influencer.init({
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
      defaultValue: null
    },
    Number: {
      type: DataTypes.BIGINT,
      defaultValue: null
    },
    Email: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    MainContentLanguage: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SubContentLang: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    MainVertical: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SubVertical: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    Occupation: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    ItpRelationship: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    Nationality: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SecondNationality: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    CountryLocation: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    CityLocation: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    Address: {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    InstagramHandle: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    InstagramFollowers: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    InstagramLink: {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    TiktokHandle: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    TiktokFollowers: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    TiktokLink: {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    SnapchatHandle: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    SnapchatFollowers: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    SnapchatLink: {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    TwitterHandle: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    TwitterFollowers: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    TwitterLink: {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    FacebookHandle: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    FacebookFollowers: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    FacebookLink: {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    YoutubeHandle: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    YoutubeFollowers: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    YoutubeLink: {
      type: DataTypes.STRING(250),
      defaultValue: null
    },
    AudienceMalePer: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AudienceFemalePer: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AgeGroup1317: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AgeGroup1824: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AgeGroup2534: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AgeGroup3544: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AgeGroup4554: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AgeGroup55: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AudienceTopCountries1: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    AudienceTopCountries1Percentage: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AudienceTopCountries2: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    AudienceTopCountries2Percentage: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    AudienceTopCountries3: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    AudienceTopCountries3Percentage: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: null
    },
    KSALicense: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    UAELicense: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    AgencyContactPerson: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    AgencyNumber: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },
    AgencyEmail: {
      type: DataTypes.STRING(50),
      defaultValue: null
    },
    PreviousBrands: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    Bio: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    Notes: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    Status: {
      type: DataTypes.STRING(10),
      defaultValue: "Active"
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'influencer',
    modelName: 'Influencer',
  });
  return Influencer;
};