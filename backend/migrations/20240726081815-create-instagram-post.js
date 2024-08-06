'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('instagram_posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      instagramProfileId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'instagram_profiles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      postId: Sequelize.STRING,
      text: Sequelize.TEXT,
      url: Sequelize.STRING,
      created: Sequelize.DATE,
      thumbnail: Sequelize.STRING,
      likes: Sequelize.INTEGER,
      comments: Sequelize.INTEGER,
      views: Sequelize.INTEGER,
      type: Sequelize.STRING,
      mentions: Sequelize.JSON,
      hashtags: Sequelize.JSON,
      video: Sequelize.STRING,
      image: Sequelize.STRING,
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
    await queryInterface.dropTable('instagram_posts');
  }
};
