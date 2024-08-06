'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tiktok_profiles', {
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
      secUid: Sequelize.STRING,
      username: Sequelize.STRING,
      fullName: Sequelize.STRING,
      profilePicture: Sequelize.STRING,
      bio: Sequelize.TEXT,
      isPrivate: Sequelize.BOOLEAN,
      isVerified: Sequelize.BOOLEAN,
      followerCount: Sequelize.INTEGER,
      followingCount: Sequelize.INTEGER,
      postCount: Sequelize.INTEGER,
      avgLikes: Sequelize.FLOAT,
      avgViews: Sequelize.FLOAT,
      avgComments: Sequelize.FLOAT,
      totalLikes: Sequelize.BIGINT,
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
    await queryInterface.dropTable('tiktok_profiles');
  }
};
