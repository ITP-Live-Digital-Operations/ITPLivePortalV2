'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.User, {foreignKey: 'parentId', as: 'parent'})
      User.hasMany(models.User, {foreignKey: 'parentId', as: 'children'})
      User.hasMany(models.Logs, {foreignKey: 'userID', as: 'logs'})
      User.hasMany(models.SalesBrief, {foreignKey: 'CreatedbyID', as: 'salesbriefs'})
      User.hasMany(models.Task, {foreignKey: 'assigned_by', as: 'assigned_by'})
      User.belongsToMany(models.Task, { through: 'UserTasks', foreignKey: 'userId', as: 'assignedUsers' });
      User.hasMany(models.Influencer, {foreignKey: 'updatedBy', as: 'influencer'})
      User.hasMany(models.InfluencerRating, {foreignKey: 'createdBy_id', as: 'influencerRating'})
      User.hasMany(models.TimeForm, {foreignKey: 'user_id', as: 'timeform'})
      User.hasMany(models.File, {foreignKey: 'uploaded_by', as: 'files'})
      User.hasMany(models.Campaign, {foreignKey: 'createdBy', as: 'campaigns'})
      User.hasMany(models.CampaignFiles, {foreignKey: 'uploadedBy', as: 'campaignFiles'})
    }

    /* toJSON(){
      return {...this.get(), password: undefined, hash: undefined}
    } */
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    privilege_level:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parentId:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    hash:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    loginCount:{
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    position:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    location:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    team : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    onLeave : {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  }); 
  return User
};   