'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tiktok_videos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tiktokProfileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tiktok_profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      videoId: Sequelize.STRING,
      text: Sequelize.TEXT,
      url: Sequelize.STRING,
      created: Sequelize.DATE,
      thumbnail: Sequelize.STRING,
      likes: Sequelize.INTEGER,
      comments: Sequelize.INTEGER,
      views: Sequelize.INTEGER,
      video: Sequelize.STRING,
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
    await queryInterface.dropTable('tiktok_videos');
  }
};
