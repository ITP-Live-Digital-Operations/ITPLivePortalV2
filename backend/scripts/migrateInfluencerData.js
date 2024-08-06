const { Sequelize } = require('sequelize');
const winston = require('winston');
const path = require('path');

// Import your Sequelize instance and models
const { sequelize, Influencer, InstagramProfile, YouTubeProfile, TikTokProfile } = require('../models');

// Set up Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(__dirname, '../logs/migration-error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(__dirname, '../logs/migration.log') }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

async function migrateData() {
  const transaction = await sequelize.transaction();

  try {
    logger.info('Starting data migration');

    // Fetch all influencers
    const influencers = await Influencer.findAll();
    logger.info(`Found ${influencers.length} influencers to migrate`);

    for (const influencer of influencers) {
      logger.info(`Migrating data for influencer ${influencer.id}`);

      // Migrate Instagram data
      if (influencer.InstagramHandle) {
        await InstagramProfile.create({
          influencerId: influencer.id,
          username: influencer.InstagramHandle,
          followerCount: influencer.InstagramFollowers,
          // Add other relevant fields here
        }, { transaction });
        logger.info(`Created Instagram profile for influencer ${influencer.id}`);
      }

      // Migrate YouTube data
      if (influencer.YoutubeHandle) {
        await YouTubeProfile.create({
          influencerId: influencer.id,
          username: influencer.YoutubeHandle,
          subscriberCount: influencer.YoutubeFollowers,
          // Add other relevant fields here
        }, { transaction });
        logger.info(`Created YouTube profile for influencer ${influencer.id}`);
      }

      // Migrate TikTok data
      if (influencer.TiktokHandle) {
        await TikTokProfile.create({
          influencerId: influencer.id,
          username: influencer.TiktokHandle,
          followerCount: influencer.TiktokFollowers,
          // Add other relevant fields here
        }, { transaction });
        logger.info(`Created TikTok profile for influencer ${influencer.id}`);
      }
    }

    await transaction.commit();
    logger.info('Data migration completed successfully');
  } catch (error) {
    await transaction.rollback();
    logger.error('Error during data migration:', error);
    throw error;
  }
}

// Run the migration
migrateData()
  .then(() => {
    logger.info('Migration process finished');
    sequelize.close();
  })
  .catch((error) => {
    logger.error('Migration failed:', error);
    sequelize.close();
  });