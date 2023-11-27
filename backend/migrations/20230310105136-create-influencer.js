'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('influencer', {
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
      }, TwitchHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null
      },
      TwitchFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      TwitchLink: {
        type: DataTypes.STRING(250),
        defaultValue: null
      },
      TelegramHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null
      },
      TelegramFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      TelegramLink: {
        type: DataTypes.STRING(250),
        defaultValue: null
      },
      VKHandle: {
        type: DataTypes.STRING(50),
        defaultValue: null
      },
      VKFollowers: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      VKLink: {
        type: DataTypes.STRING(250),
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
        defaultValue: null
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
          model: 'users',
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('influencer');
  }
};