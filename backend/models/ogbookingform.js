'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ogbookingForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ogbookingForm.belongsTo(models.ogbookings, {foreignKey: 'ogbookingId'})
      ogbookingForm.belongsToMany(models.User, {through: 'ogbookingFormProductionStaff', as : 'productionStaff'})
      
    }
  }
  ogbookingForm.init({
    id :{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ogbookingId: {
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
      allowNull: true,
    },
    fullShootBrief: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    equipmentNeeded: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cameraNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nicMicNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    paintingOrProps: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // editor brief fields
    deadlineDateDraft1: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deadlineDateDraft1Link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deadlineDateDraft1Comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deadlineDateDraft2: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deadlineDateDraft2Link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    deadlineDateDraft2Comments: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    deadlineDateFinal: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deadlineDateFinalLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfEpisodeGoingLive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fullEpisodeBrief: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkOfFootage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    music: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brolls: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    graphics : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    textNeeded: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guestSocialMediaLinks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requestedEditorId : {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    // graphic desginer brief fields
    dateOfthumbnailGoingLive: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fullThumbnailBrief: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkOfPictures: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    requestedGraphicDesignerId : {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    

    
  }, {
    sequelize,
    tableName: 'ogbookingform',
    modelName: 'ogbookingForm',
  });
  return ogbookingForm;
};