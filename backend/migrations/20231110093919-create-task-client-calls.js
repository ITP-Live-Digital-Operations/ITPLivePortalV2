'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('taskClientCalls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      introCheck: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false, 
      },
      introDate: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      introNotes: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      briefCheck: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      briefDate: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      briefNotes: {
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      presentationCheck : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      presentationDate: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      presentationNotes: {
        type: DataTypes.TEXT,
        defaultValue: '',
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('taskClientCalls');
  }
};