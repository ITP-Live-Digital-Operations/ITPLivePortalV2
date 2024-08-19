'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('instagram_profiles', {
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
      bio: Sequelize.TEXT,
      isPrivate: Sequelize.BOOLEAN,
      isVerified: Sequelize.BOOLEAN,
      accountType: Sequelize.STRING,
      followerCount: Sequelize.INTEGER,
      followingCount: Sequelize.INTEGER,
      postCount: Sequelize.INTEGER,
      avgLikes: Sequelize.FLOAT,
      avgComments: Sequelize.FLOAT,
      avgReelsPlays: Sequelize.FLOAT,
      engagementRate: Sequelize.FLOAT,
      city: Sequelize.STRING,
      country: Sequelize.STRING,
      language: Sequelize.STRING,
      gender: Sequelize.STRING,
      ageGroup: Sequelize.STRING,
      paidPostPerformance: Sequelize.FLOAT,
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
    await queryInterface.dropTable('instagram_profiles');
  }
};
