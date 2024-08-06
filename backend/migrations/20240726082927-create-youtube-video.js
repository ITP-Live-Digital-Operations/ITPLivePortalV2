'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('youtube_videos', {
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
      videoId: Sequelize.STRING,
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      url: Sequelize.STRING,
      created: Sequelize.DATE,
      thumbnail: Sequelize.STRING,
      likes: Sequelize.INTEGER,
      comments: Sequelize.INTEGER,
      views: Sequelize.INTEGER,
      type: Sequelize.STRING,
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
    await queryInterface.dropTable('youtube_videos');
  }
};
