'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('youtube_audience_demographics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      youtubeProfileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'youtube_profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: Sequelize.STRING,
      code: Sequelize.STRING,
      name: Sequelize.STRING,
      weight: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('youtube_audience_demographics');
  }
};
