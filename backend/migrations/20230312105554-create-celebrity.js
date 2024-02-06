'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('celebrity', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Gender: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Number: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MainContentLanguage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      MainVertical: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Occupation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Nationality: {
        type: DataTypes.STRING,
        allowNull: true
      },
      CountryLocation: {
        type: DataTypes.STRING,
        allowNull: true
      },
      InstagramHandle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      InstagramFollowers: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      InstagramLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TiktokHandle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TiktokFollowers: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      TiktokLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TwitterHandle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TwitterFollowers: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      TwitterLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      YoutubeHandle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      YoutubeFollowers: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      YoutubeLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TwitchHandle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      TwitchFollowers: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      TwitchLink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      Agency : {
        type: DataTypes.STRING,
        allowNull: true
      },
      AgencyContactPerson: {
        type: DataTypes.STRING,
        allowNull: true
      },
      AgencyNumber: {
        type: DataTypes.BIGINT,
        allowNull: true
      },
      AgencyEmail: {
        type: DataTypes.STRING,
        allowNull: true
      },
      PreviousBrands: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      PreviouslyWorkedWith: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        defaultValue: null
      },
      
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('celebrity');
  }
};