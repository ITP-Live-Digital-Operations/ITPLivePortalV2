'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('ogbookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      staffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      showId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'ogshows',
          key: 'id'
        }
      },
      team: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      shootName : {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      numberOfGuests: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      guestNames: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      startingDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      endingDate: {
        type: DataTypes.DATE,
        allowNull: true
      },
      progress : {
        type: DataTypes.STRING(20),
        allowNull: true
      },

      notes : {
        type: DataTypes.TEXT,
        allowNull: true
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
    await queryInterface.dropTable('ogbookings');
  }
};