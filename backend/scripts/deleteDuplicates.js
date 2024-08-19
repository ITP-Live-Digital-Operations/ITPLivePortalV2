const { Sequelize } = require('sequelize');
const winston = require('winston');
const path = require('path');

// Import your Sequelize instance and models
const { sequelize, InstagramProfile, YouTubeProfile, TikTokProfile } = require('../models');

// Set up Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/delete-duplicates-error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(__dirname, '../logs/delete-duplicates.log') }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

async function deleteDuplicates() {
  const transaction = await sequelize.transaction();

  try {
    logger.info('Starting duplicate deletion');

    // Delete duplicates from InstagramProfile table
    const instagramDuplicates = await InstagramProfile.findAll({
      attributes: ['influencerId'],
      group: ['influencerId'],
      having: Sequelize.literal('count(*) > 1')
    });

    for (const duplicate of instagramDuplicates) {
      await InstagramProfile.destroy({
        where: {
          influencerId: duplicate.influencerId
        },
        limit: 1,
        transaction
      });
      logger.info(`Deleted duplicate Instagram profile for influencer ${duplicate.influencerId}`);
    }

    // Delete duplicates from YouTubeProfile table
    const youtubeDuplicates = await YouTubeProfile.findAll({
      attributes: ['influencerId'],
      group: ['influencerId'],
      having: Sequelize.literal('count(*) > 1')
    });

    for (const duplicate of youtubeDuplicates) {
      await YouTubeProfile.destroy({
        where: {
          influencerId: duplicate.influencerId
        },
        limit: 1,
        transaction
      });
      logger.info(`Deleted duplicate YouTube profile for influencer ${duplicate.influencerId}`);
    }

    // Delete duplicates from TikTokProfile table
    const tiktokDuplicates = await TikTokProfile.findAll({
      attributes: ['influencerId'],
      group: ['influencerId'],
      having: Sequelize.literal('count(*) > 1')
    });

    for (const duplicate of tiktokDuplicates) {
      await TikTokProfile.destroy({
        where: {
          influencerId: duplicate.influencerId
        },
        limit: 1,
        transaction
      });
      logger.info(`Deleted duplicate TikTok profile for influencer ${duplicate.influencerId}`);
    }

    await transaction.commit();
    logger.info('Duplicate deletion completed successfully');
  } catch (error) {
    await transaction.rollback();
    logger.error('Error during duplicate deletion:', error);
    throw error;
  }
}

// Run the duplicate deletion
deleteDuplicates()
  .then(() => {
    logger.info('Duplicate deletion process finished');
    sequelize.close();
  })
  .catch((error) => {
    logger.error('Duplicate deletion failed:', error);
    sequelize.close();
  });