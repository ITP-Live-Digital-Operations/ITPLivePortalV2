const { sequelize, Sequelize } = require("../models/index");
const { Op } = Sequelize;
const winston = require("winston");
const path = require("path");
const csv = require("csv-parser");
const fs = require("fs");

// Import your Sequelize instance and models
const {
  Influencer,
  InstagramProfile,
  YouTubeProfile,
  TikTokProfile,
} = require("../models");

// Set up Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/migration-error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/migration.log"),
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});


// Function to read CSV file and get influencer IDs to skip
async function getSkipInfluencerIds(filePath) {
  return new Promise((resolve, reject) => {
    const skipIds = new Set();
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        skipIds.add(row['influencerId']);  // Adjust this key to match your CSV header
      })
      .on("end", () => {
        resolve(skipIds);
      })
      .on("error", reject);
  });
}

// Validation functions
function isValidInstagramHandle(handle) {
  // Instagram handles can contain letters, numbers, underscores, and dots
  // They must be between 1 and 30 characters long
  // Dots cannot be at the beginning, end, or consecutive
  const instagramRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
  return instagramRegex.test(handle);
}

function isValidYouTubeHandle(handle) {
  // YouTube handles can contain letters, numbers, and underscores (no dots)
  // They must be between 4 and 20 characters long
  const youtubeRegex = /^[a-zA-Z0-9_-]{4,20}$/;
  return youtubeRegex.test(handle);
}

function isValidTikTokHandle(handle) {
  // TikTok handles can contain letters, numbers, underscores, and dots
  // They must be between 2 and 24 characters long
  const tiktokRegex = /^[a-zA-Z0-9._]{2,24}$/;
  return tiktokRegex.test(handle);
}

// Function to remove spaces from handles
function removeSpaces(handle) {
  return handle.trim().replace(/\s/g, "");
}


async function migrateData() {
  const transaction = await sequelize.transaction();

  try {
    logger.info("Starting data migration");

    // Read the IDs from the CSV file that should be skipped for YouTube profiles
    const skipYoutubeIds = await getSkipInfluencerIds('./files/youtube_filtered_influencer_data.csv');

    // Fetch all influencers
    const influencers = await Influencer.findAll({
      where: {
        id:InfluencerId
        
      }
    });
    logger.info(`Found ${influencers.length} influencers to migrate`);

    for (const influencer of influencers) {
      logger.info(`Migrating data for influencer ${influencer.id}`);

      // Migrate Instagram data
      if (influencer.InstagramHandle) {
        const cleanedInstagramHandle = removeSpaces(influencer.InstagramHandle);
        if (isValidInstagramHandle(cleanedInstagramHandle)) {
          const [instagramProfile, instagramCreated] =
            await InstagramProfile.findOrCreate({
              where: { influencerId: influencer.id },
              defaults: {
                influencerId: influencer.id,
                username: cleanedInstagramHandle,
                // Add other relevant fields here
              },
              transaction,
            });

          if (instagramCreated) {
            logger.info(
              `Created Instagram profile for influencer ${influencer.id}`
            );
          } else {
            logger.info(
              `Instagram profile already exists for influencer ${influencer.id}`
            );
          }
        } else {
          logger.warn(
            `Invalid Instagram handle for influencer ${influencer.id}: ${influencer.InstagramHandle}`
          );
        }
      }

      // YouTube migration logic (updated)
      if (influencer.YoutubeHandle) {
        const cleanedYouTubeHandle = removeSpaces(influencer.YoutubeHandle);
        if (isValidYouTubeHandle(cleanedYouTubeHandle)) {
          if (!skipYoutubeIds.has(String(influencer.id))) {
            const [youtubeProfile, youtubeCreated] =
              await YouTubeProfile.findOrCreate({
                where: { influencerId: influencer.id },
                defaults: {
                  influencerId: influencer.id,
                  username: cleanedYouTubeHandle,
                  // Add other relevant fields here
                },
                transaction,
              });

            if (youtubeCreated) {
              logger.info(
                `Created YouTube profile for influencer ${influencer.id}`
              );
            } else {
              logger.info(
                `YouTube profile already exists for influencer ${influencer.id}`
              );
            }
          } else {
            logger.info(
              `Skipping YouTube profile creation for influencer ${influencer.id} as per CSV file`
            );
          }
        } else {
          logger.warn(
            `Invalid YouTube handle for influencer ${influencer.id}: ${influencer.YoutubeHandle}`
          );
        }
      }

      // Migrate TikTok data
      if (influencer.TiktokHandle) {
        const cleanedTikTokHandle = removeSpaces(influencer.TiktokHandle);
        if (isValidTikTokHandle(cleanedTikTokHandle)) {
          const [tiktokProfile, tiktokCreated] =
            await TikTokProfile.findOrCreate({
              where: { influencerId: influencer.id },
              defaults: {
                influencerId: influencer.id,
                username: cleanedTikTokHandle,
                // Add other relevant fields here
              },
              transaction,
            });

          if (tiktokCreated) {
            logger.info(
              `Created TikTok profile for influencer ${influencer.id}`
            );
          } else {
            logger.info(
              `TikTok profile already exists for influencer ${influencer.id}`
            );
          }
        } else {
          logger.warn(
            `Invalid TikTok handle for influencer ${influencer.id}: ${influencer.TiktokHandle}`
          );
        }
      }
    }

    await transaction.commit();
    logger.info("Data migration completed successfully");
  } catch (error) {
    await transaction.rollback();
    logger.error("Error during data migration:", error);
    throw error;
  }
}

// Run the migration
const InfluencerId = 4240; // Set this to your desired minimum influencer ID
migrateData()
  .then(() => {
    logger.info("Migration process finished");
    sequelize.close();
  })
  .catch((error) => {
    logger.error("Migration failed:", error);
    sequelize.close();
  });