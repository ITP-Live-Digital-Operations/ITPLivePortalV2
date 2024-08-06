'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('youtube_stat_history', {
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
      month: Sequelize.DATE,
      followers: Sequelize.INTEGER,
      following: Sequelize.INTEGER,
      avgLikes: Sequelize.FLOAT,
      avgViews: Sequelize.FLOAT,
      avgComments: Sequelize.FLOAT,
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
    await queryInterface.dropTable('youtube_stat_history');
  }
};
