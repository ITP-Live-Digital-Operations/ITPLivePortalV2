"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Influencer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Influencer.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "user",
      });
      Influencer.hasMany(models.Logs, {
        foreignKey: "influencerID",
        as: "influencer",
      });
      Influencer.hasMany(models.InfluencerRating, {
        foreignKey: "influencer_id",
        as: "influencerRating",
      });
      Influencer.belongsToMany(models.Campaign, {
        through: "influencer_campaign",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Influencer.hasMany(models.InfluencerStatistics, {
        foreignKey: "influencerId",
        as: "influencerStatistics",
      });
      Influencer.hasOne(models.influencerMetrics, {
        foreignKey: "influencerId",
        as: "influencerMetrics",
      });
      Influencer.hasOne(models.InstagramProfile, {
        foreignKey: "influencerId",
        as: "instagramProfile",
      });
      Influencer.hasOne(models.YouTubeProfile, {
        foreignKey: "influencerId",
        as: "youtubeProfile",
      });
      Influencer.hasOne(models.TikTokProfile, {
        foreignKey: "influencerId",
        as: "tiktokProfile",
      });
    }
  }
  Influencer.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      Gender: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      Number: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      Email: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      MainContentLanguage: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      SubContentLang: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      MainVertical: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      SubVertical: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      Occupation: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      ItpRelationship: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      Nationality: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      SecondNationality: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      CountryLocation: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      CityLocation: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      Address: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      InstagramHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      InstagramFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      InstagramLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      TiktokHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      TiktokFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      TiktokLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      SnapchatHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      SnapchatFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      SnapchatLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      TwitterHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      TwitterFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      TwitterLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      FacebookHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      FacebookFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      FacebookLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      YoutubeHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      YoutubeFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      YoutubeLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      TwitchHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      TwitchFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      TwitchLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      TelegramHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      TelegramFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      TelegramLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },

      VKHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      VKFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      VKLink: {
        type: DataTypes.STRING(250),
        defaultValue: null,
      },
      KSALicense: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      UAELicense: {
        type: DataTypes.BOOLEAN,
        defaultValue: null,
      },
      AgencyContactPerson: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      AgencyNumber: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      AgencyEmail: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      PreviousBrands: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      Bio: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      Notes: {
        type: DataTypes.TEXT,
        defaultValue: null,
      },
      Status: {
        type: DataTypes.STRING(10),
        defaultValue: "Active",
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: "users",
          key: "id",
        },
      },
      // added after modash
      profilePicture :{
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      ageGroup: {
        type: DataTypes.STRING(50),
        defaultValue: null,
      },
      avgComments : {
        type: DataTypes.FLOAT,
        defaultValue: null,
      },
      engagementRate: {
        type: DataTypes.FLOAT,
        defaultValue: null,
      },
      lastApiCall : {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    
      },
    {
      sequelize,
      tableName: "influencer",
      modelName: "Influencer",
    }
  );
  return Influencer;
};
