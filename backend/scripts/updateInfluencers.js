// 1. Import statements
const {
  logger,
  fetchProfileData,
  getNestedProperty,
  RateLimiter,
} = require("./utilities");
const {
  updateInstagramProfile,
} = require("./update_profiles/updateInstagramProfile.js");
const {
  updateYouTubeProfile,
} = require("./update_profiles/updateYouTubeProfile.js");
const {
  updateTikTokProfile,
} = require("./update_profiles/updateTikTokProfile.js");
const {
  Influencer,
  InstagramProfile,
  YouTubeProfile,
  TikTokProfile,
  InstagramAudienceDemographic,
  YouTubeAudienceDemographic,
  TikTokAudienceDemographic,
} = require("../models");
const { sequelize } = require("../models");


async function calculateInfluencerAgeGroup(instagram, youtube, tiktok) {
  function parseAgeGroup(ageGroup) {
    if (!ageGroup) return null;

    const [min, max] = ageGroup.split("-").map(Number);
    return { min, max };
  }

  const instagramAge = parseAgeGroup(
    getNestedProperty(instagram, "profile.ageGroup")
  );
  const youtubeAge = parseAgeGroup(
    getNestedProperty(youtube, "profile.ageGroup")
  );
  const tiktokAge = parseAgeGroup(
    getNestedProperty(tiktok, "profile.ageGroup")
  );

  const ageGroups = [instagramAge, youtubeAge, tiktokAge].filter(
    (age) => age !== null
  );

  if (ageGroups.length === 0) return null;

  const averageMin = Math.round(
    ageGroups.reduce((acc, age) => acc + age.min, 0) / ageGroups.length
  );
  const averageMax = Math.round(
    ageGroups.reduce((acc, age) => acc + age.max, 0) / ageGroups.length
  );

  return `${averageMin}-${averageMax}`;
}

async function calculateAvgComments(instagram, youtube, tiktok) {
  const instagramComments = getNestedProperty(instagram, "profile.avgComments");
  const youtubeComments = getNestedProperty(youtube, "profile.avgComments");
  const tiktokComments = getNestedProperty(tiktok, "profile.avgComments");
  const avgComments = [
    instagramComments,
    youtubeComments,
    tiktokComments,
  ].filter((comment) => comment != null);
  if (avgComments.length === 0) return null;
  return (
    avgComments.reduce((acc, comment) => acc + comment, 0) / avgComments.length
  );
}

async function calculateAvgEngagementRate(instagram, youtube, tiktok) {
  const instagramEngagementRate = getNestedProperty(
    instagram,
    "profile.profile.engagementRate"
  );
  const youtubeEngagementRate = getNestedProperty(
    youtube,
    "profile.profile.engagementRate"
  );
  const tiktokEngagementRate = getNestedProperty(
    tiktok,
    "profile.profile.engagementRate"
  );
  const avgEngagementRate = [
    instagramEngagementRate,
    youtubeEngagementRate,
    tiktokEngagementRate,
  ].filter((rate) => rate != null);
  if (avgEngagementRate.length === 0) return null;
  return (
    avgEngagementRate.reduce((acc, rate) => acc + rate, 0) /
    avgEngagementRate.length
  );
}

async function updateInfluencerData(influencer, profiles, options = {}) {
  const { instagram, youtube, tiktok } = profiles;
  const Name =
    getNestedProperty(instagram, "profile.profile.fullname") ||
    getNestedProperty(youtube, "profile.profile.fullname") ||
    getNestedProperty(tiktok, "profile.profile.fullname") || influencer.Name;
  const Gender =
    getNestedProperty(instagram, "profile.gender") ||
    getNestedProperty(youtube, "profile.gender") ||
    getNestedProperty(tiktok, "profile.gender");
  const MainContentLanguage = getNestedProperty(
    instagram,
    "profile.language.name"
  );
  const CountryLocation =
    getNestedProperty(instagram, "profile.country") ||
    getNestedProperty(youtube, "profile.country") ||
    getNestedProperty(tiktok, "profile.country");
  const CityLocation =
    getNestedProperty(instagram, "profile.city") ||
    getNestedProperty(youtube, "profile.city") ||
    getNestedProperty(tiktok, "profile.city");
  const profilePicture =
    getNestedProperty(instagram, "profile.profile.picture") ||
    getNestedProperty(youtube, "profile.profile.picture") ||
    getNestedProperty(tiktok, "profile.profile.picture");
  const ageGroup = await calculateInfluencerAgeGroup(
    instagram,
    youtube,
    tiktok
  );
  const avgComments = await calculateAvgComments(instagram, youtube, tiktok);
  const engagementRate = await calculateAvgEngagementRate(
    instagram,
    youtube,
    tiktok
  );
  const interests = getNestedProperty(instagram, "profile.interests");
  const MainVertical = interests?.[0]?.name;
  const SubVertical = interests?.[1]?.name;
  const lastApiCall = new Date();
  const InstagramFollowers = getNestedProperty(
    instagram,
    "profile.profile.followers"
  );
  const YoutubeFollowers = getNestedProperty(
    youtube,
    "profile.profile.followers"
  );
  const TiktokFollowers = getNestedProperty(
    tiktok,
    "profile.profile.followers"
  );


  const updatedData = {
    Name: Name,
    Gender: Gender,
    MainContentLanguage: MainContentLanguage,
    CountryLocation: CountryLocation,
    CityLocation: CityLocation,
    profilePicture: profilePicture,
    ageGroup: ageGroup,
    avgComments: avgComments,
    engagementRate: engagementRate,
    MainVertical: MainVertical,
    SubVertical: SubVertical,
    InstagramFollowers: InstagramFollowers,
    YoutubeFollowers: YoutubeFollowers,
    TiktokFollowers: TiktokFollowers,
    updatedAt: new Date(),
    lastApiCall: lastApiCall,
  };
  console.log(updatedData);

  // Pass transaction as part of options
  try {
    await influencer.update(updatedData, { ...options });
    logger.info(updatedData);
    logger.info(
      `This message is here. Updated influencer data for influencer ${influencer.id}`
    );
  } catch (error) {
    logger.error(
      `Error updating influencer data for influencer ${influencer.id}:`,
      error
    );
    throw error;
  }
}

// 13. updateInfluencers function
async function updateInfluencerProfile(influencerId) {
  try {
    // Fetch main influencer data along with all profiles in one go
    const influencer = await Influencer.findByPk(influencerId, {
      include: [
        { model: InstagramProfile, as: "instagramProfile" },
        { model: YouTubeProfile, as: "youtubeProfile" },
        { model: TikTokProfile, as: "tiktokProfile" },
      ],
    });
    if (!influencer) {
      logger.error(`Influencer not found for id: ${influencerId}`);
      return null;
    }

    // Fetch new data from API only if the profiles exist
    let instagramData = null;
    let youtubeData = null;
    let tiktokData = null;

    try {
      // Using Promise.all to fetch all data concurrently
      [instagramData, youtubeData, tiktokData] = await Promise.all([
        influencer.instagramProfile
          ? fetchProfileData(
              "instagram",
              influencer.instagramProfile.username,
              influencer.instagramProfile.id,
              influencerId
            )
          : null,
        influencer.youtubeProfile
          ? fetchProfileData(
              "youtube",
              influencer.youtubeProfile.username,
              influencer.youtubeProfile.id,
              influencerId
            )
          : null,
        influencer.tiktokProfile
          ? fetchProfileData(
              "tiktok",
              influencer.tiktokProfile.username,
              influencer.tiktokProfile.id,
              influencerId
            )
          : null,
      ]);

      // Check if all fetched data is null
      if (!instagramData && !youtubeData && !tiktokData) {
        logger.info(`No new data fetched for influencer ${influencerId}`);
        return influencer; // Return the influencer as is, no updates required
      }

      // Start a transaction to update profiles
      await sequelize.transaction(async (transaction) => {
        if (instagramData) {
          influencer.instagramProfile = updateInstagramProfile(
            influencer.instagramProfile,
            instagramData
          );
        }

        if (youtubeData) {
          influencer.youtubeProfile = updateYouTubeProfile(
            influencer.youtubeProfile,
            youtubeData
          );
        }

        if (tiktokData) {
          influencer.tiktokProfile = updateTikTokProfile(
            influencer.tiktokProfile,
            tiktokData
          );
        }

        // Update main influencer data
        if (instagramData || youtubeData || tiktokData) {
          await updateInfluencerData(
            influencer,
            {
              instagram: instagramData,
              youtube: youtubeData,
              tiktok: tiktokData,
            },
            { transaction }
          ); // Pass the transaction context here
        }
      });
    } catch (error) {
      logger.error(
        `Error fetching data for influencer ${influencerId}:`,
        error
      );
      throw error; // Re-throw the error to ensure transaction rollback
    }

    logger.info(`Updated profiles for influencer ${influencerId}`);
    return influencer;
  } catch (error) {
    logger.error(
      `Error updating profiles for influencer ${influencerId}:`,
      error
    );
    throw error;
  }
}

async function updateInfluencers(batchSize = 100, testId = null) {
  let influencers;

  if (testId) {
    // If a test ID is provided, only fetch that specific influencer
    influencers = await Influencer.findAll({
      where: { id: testId },
      attributes: ["id"],
      raw: true,
    });
    logger.info(`Testing update for influencer with ID: ${testId}`);
  } else {
    // Fetch all influencers if no test ID is provided
    influencers = await Influencer.findAll({
      attributes: ["id"],
      raw: true,
    });
  }

  if (influencers.length === 0) {
    logger.warn(`No influencers found${testId ? ` with ID ${testId}` : ""}`);
    return;
  }

  for (let i = 0; i < influencers.length; i += batchSize) {
    const batch = influencers.slice(i, i + batchSize);
    await Promise.all(
      batch.map((influencer) => updateInfluencerProfile(influencer.id))
    );
    logger.info(`Processed batch ${i / batchSize + 1}`);
  }

  logger.info(
    `Finished processing ${influencers.length} influencer${
      influencers.length > 1 ? "s" : ""
    }`
  );
}

module.exports = {
  updateInfluencers,
  updateInfluencerProfile,
};
