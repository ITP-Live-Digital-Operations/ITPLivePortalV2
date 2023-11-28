'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('influencerrating', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      influencer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'influencer',
          key: 'id'
        } 
      },
      responseRate: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      contentQuality: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      creativity: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      flexibility: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      campaignPerformance: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
      notes:{
        type: DataTypes.TEXT,
        defaultValue: null
      },
      createdBy_id: {
        type: DataTypes.INTEGER,
        allowedNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
     
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('influencerrating');
  }
};