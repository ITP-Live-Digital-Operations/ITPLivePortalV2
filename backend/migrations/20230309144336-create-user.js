'use strict';

const { QueryInterface } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password : {  
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      privilege_level: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      parentId:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false
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
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('users');
  }
};