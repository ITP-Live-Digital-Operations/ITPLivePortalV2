'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ogbookingform', {
      id :{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      /* ogbookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ogbookings',
          key: 'id'
        }
      },
      // production brief fields 
      locationOfShoot: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      equipmentNeeded: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cameraNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nicMicNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paintingOrProps: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // editor brief fields
      deadlineDateDraft1: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deadlineDateDraft1Link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadlineDateDraft1Comments: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deadlineDateDraft2: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deadlineDateDraft2Link: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadlineDateDraft2Comments: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deadlineDateFinal: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deadlineDateFinalLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfEpisodeGoingLive: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fullEpisodeBrief: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      linkOfFootage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      music: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brolls: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      graphics : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      textNeeded: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guestSocialMediaLinks: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      requestedEditorId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      // graphic desginer brief fields
      dateOfthumbnailGoingLive: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      fullThumbnailBrief: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      linkOfPictures: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      requestedGraphicDesignerId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }, */
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
    await queryInterface.dropTable('ogbookingform');
  }
};