'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('campaigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      campaignName: {
        type: DataTypes.STRING
      },
      market: {
        type: DataTypes.STRING
      },
      clientId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'clients',
          key: 'id'
        }
      },
      brandId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'brand',
          key: 'id'
        },
        allowNull: true
      
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        defaultValue: 1 
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
    await queryInterface.dropTable('campaigns');
  }
};