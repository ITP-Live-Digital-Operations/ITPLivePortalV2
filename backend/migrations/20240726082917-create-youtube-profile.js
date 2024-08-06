'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('youtube_profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      influencerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'influencer', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      userId: Sequelize.STRING,
      username: Sequelize.STRING,
      fullName: Sequelize.STRING,
      profilePicture: Sequelize.STRING,
      description: Sequelize.TEXT,
      isVerified: Sequelize.BOOLEAN,
      subscriberCount: Sequelize.INTEGER,
      videoCount: Sequelize.INTEGER,
      avgViews: Sequelize.FLOAT,
      avgLikes: Sequelize.FLOAT,
      avgComments: Sequelize.FLOAT,
      totalViews: Sequelize.BIGINT,
      engagementRate: Sequelize.FLOAT,
      city: Sequelize.STRING,
      country: Sequelize.STRING,
      gender: Sequelize.STRING,
      ageGroup: Sequelize.STRING,
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
    await queryInterface.dropTable('youtube_profiles');
  }
};
