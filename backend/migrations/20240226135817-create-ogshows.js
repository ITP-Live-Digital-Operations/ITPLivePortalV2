'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ogshows', {
      id :{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      color : {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      colorCode : {
        type: DataTypes.STRING(20),
        allowNull: true
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('ogshows');
  }
};