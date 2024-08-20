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

// 12. updateInfluencerData function

// Helper functions for data aggregation
/* function calculateTotalEngagements(instagram, youtube, tiktok) {
  let totalEngagements = 0;

  // Instagram engagements
  if (instagram && instagram.recentPosts) {
    totalEngagements += instagram.recentPosts.reduce(
      (sum, post) => sum + post.likes + post.comments,
      0
    );
  }

  // YouTube engagements
  if (youtube && youtube.recentVideos) {
    totalEngagements += youtube.recentVideos.reduce(
      (sum, video) => sum + video.likes + video.comments + video.views,
      0
    );
  }

  // TikTok engagements
  if (tiktok && tiktok.recentVideos) {
    totalEngagements += tiktok.recentVideos.reduce(
      (sum, video) => sum + video.likes + video.comments + video.views,
      0
    );
  }

  return Math.round(totalEngagements);
}

function calculateAverageEngagementRate(instagram, youtube, tiktok) {
  let totalEngagements = 0;
  let totalFollowers = 0;
  let totalPosts = 0;

  if (instagram) {
    totalEngagements +=
      (instagram.avgLikes + instagram.avgComments) * instagram.postCount;
    totalFollowers += instagram.followerCount;
    totalPosts += instagram.postCount;
  }

  if (youtube) {
    totalEngagements +=
      (youtube.avgLikes + youtube.avgComments + youtube.avgViews) *
      youtube.videoCount;
    totalFollowers += youtube.subscriberCount;
    totalPosts += youtube.videoCount;
  }

  if (tiktok) {
    totalEngagements +=
      (tiktok.avgLikes + tiktok.avgComments + tiktok.avgViews) *
      tiktok.postCount;
    totalFollowers += tiktok.followerCount;
    totalPosts += tiktok.postCount;
  }

  if (totalFollowers === 0 || totalPosts === 0) {
    return 0;
  }

  const averageEngagementRate =
    (totalEngagements / totalPosts / totalFollowers) * 100;
  return Number(averageEngagementRate.toFixed(2));
}

async function calculateAverageLikesPerPost(instagram, youtube, tiktok) {
  let totalLikes = 0;
  let totalPosts = 0;

  if (instagram) {
    const instagramPosts = await instagram.getPosts();
    totalLikes += instagramPosts.reduce((sum, post) => sum + post.likes, 0);
    totalPosts += instagramPosts.length;
  }

  if (youtube) {
    const youtubeVideos = await youtube.getVideos();
    totalLikes += youtubeVideos.reduce((sum, video) => sum + video.likes, 0);
    totalPosts += youtubeVideos.length;
  }

  if (tiktok) {
    const tiktokVideos = await tiktok.getVideos();
    totalLikes += tiktokVideos.reduce((sum, video) => sum + video.likes, 0);
    totalPosts += tiktokVideos.length;
  }

  return totalPosts > 0 ? totalLikes / totalPosts : 0;
}

async function calculateAverageViewsPerPost(instagram, youtube, tiktok) {
  let totalViews = 0;
  let totalPosts = 0;

  if (instagram) {
    const instagramPosts = await instagram.getPosts();
    totalViews += instagramPosts.reduce((sum, post) => sum + post.views, 0);
    totalPosts += instagramPosts.length;
  }

  if (youtube) {
    const youtubeVideos = await youtube.getVideos();
    totalViews += youtubeVideos.reduce((sum, video) => sum + video.views, 0);
    totalPosts += youtubeVideos.length;
  }

  if (tiktok) {
    const tiktokVideos = await tiktok.getVideos();
    totalViews += tiktokVideos.reduce((sum, video) => sum + video.views, 0);
    totalPosts += tiktokVideos.length;
  }

  return totalPosts > 0 ? totalViews / totalPosts : 0;
}

function calculateAverageCommentsPerPost(instagram, youtube, tiktok) {
  let totalComments = 0;
  let totalPosts = 0;

  if (instagram) {
    totalComments += instagram.avgComments * instagram.postCount;
    totalPosts += instagram.postCount;
  }

  if (youtube) {
    totalComments += youtube.avgComments * youtube.videoCount;
    totalPosts += youtube.videoCount;
  }

  if (tiktok) {
    totalComments += tiktok.avgComments * tiktok.postCount;
    totalPosts += tiktok.postCount;
  }

  return totalPosts > 0 ? totalComments / totalPosts : 0;
}

async function aggregateAudienceAge(instagram, youtube, tiktok) {
  const ageGroups = {};
  let totalFollowers = 0;

  const profiles = [
    { profile: instagram, model: InstagramProfile },
    { profile: youtube, model: YouTubeProfile },
    { profile: tiktok, model: TikTokProfile },
  ];

  for (const { profile, model } of profiles) {
    if (profile) {
      const demographics = await model.audienceDemographics.findAll({
        where: {
          [`${model.name.toLowerCase()}ProfileId`]: profile.id,
          type: "demographic",
          code: { [Op.like]: "%age%" },
        },
      });

      demographics.forEach((demo) => {
        ageGroups[demo.code] =
          (ageGroups[demo.code] || 0) + demo.weight * profile.followerCount;
      });

      totalFollowers += profile.followerCount;
    }
  }

  const aggregatedAges = Object.entries(ageGroups).map(([code, weight]) => ({
    code,
    weight: weight / totalFollowers,
  }));

  return aggregatedAges.sort((a, b) => b.weight - a.weight);
}

async function aggregateAudienceGender(instagram, youtube, tiktok) {
  const genderData = { male: 0, female: 0, other: 0 };
  let totalFollowers = 0;

  async function processProfile(profile, model) {
    if (!profile) return;
    const followers = profile.followerCount || profile.subscriberCount || 0;
    totalFollowers += followers;
    const demographics = await model.findAll({
      where: {
        [`${model.name.toLowerCase()}ProfileId`]: profile.id,
        type: "gender",
      },
    });
    demographics.forEach((demo) => {
      const gender = demo.code.toLowerCase();
      genderData[gender] += (demo.weight / 100) * followers;
    });
  }

  await processProfile(instagram, InstagramAudienceDemographic);
  await processProfile(youtube, YouTubeAudienceDemographic);
  await processProfile(tiktok, TikTokAudienceDemographic);

  if (totalFollowers > 0) {
    Object.keys(genderData).forEach((gender) => {
      genderData[gender] = (genderData[gender] / totalFollowers) * 100;
    });
  }

  return genderData;
}
async function aggregateTopAudienceCountries(instagram, youtube, tiktok) {
  const countriesMap = new Map();

  async function processProfile(profile, Model) {
    if (!profile) return;
    const demographics = await Model.audienceDemographics.findAll({
      where: {
        [`${Model.name.toLowerCase()}ProfileId`]: profile.id,
        type: "country",
      },
    });
    demographics.forEach((demo) => {
      const current = countriesMap.get(demo.code) || 0;
      countriesMap.set(demo.code, current + demo.weight);
    });
  }

  await Promise.all([
    processProfile(instagram, InstagramProfile),
    processProfile(youtube, YouTubeProfile),
    processProfile(tiktok, TikTokProfile),
  ]);

  return Array.from(countriesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([code, weight]) => ({ code, weight: weight / 3 }));
}

async function aggregateTopAudienceLanguages(instagram, youtube, tiktok) {
  const languageMap = new Map();

  async function processProfile(profile, model) {
    if (!profile) return;
    const languages = await model.findAll({
      where: {
        [`${model.name.toLowerCase()}ProfileId`]: profile.id,
        type: "language",
      },
      attributes: ["code", "name", "weight"],
      raw: true,
    });
    languages.forEach((lang) => {
      const key = `${lang.code}:${lang.name}`;
      languageMap.set(key, (languageMap.get(key) || 0) + lang.weight);
    });
  }

  await Promise.all([
    processProfile(instagram, InstagramAudienceDemographic),
    processProfile(youtube, YouTubeAudienceDemographic),
    processProfile(tiktok, TikTokAudienceDemographic),
  ]);

  return Array.from(languageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, weight]) => {
      const [code, name] = key.split(":");
      return { code, name, weight: parseFloat(weight.toFixed(2)) };
    });
} */

async function calculateInfluencerAgeGroup(instagram, youtube, tiktok) {
  function parseAgeGroup(ageGroup) {
    if (!ageGroup) return null;

    const [min, max] = ageGroup.split('-').map(Number);
    return { min, max };
  }

  const instagramAge = parseAgeGroup(getNestedProperty(instagram, "profile.ageGroup"));
  const youtubeAge = parseAgeGroup(getNestedProperty(youtube, "profile.ageGroup"));
  const tiktokAge = parseAgeGroup(getNestedProperty(tiktok, "profile.ageGroup"));

  const ageGroups = [instagramAge, youtubeAge, tiktokAge].filter(age => age !== null);

  if (ageGroups.length === 0) return null;

  const averageMin = Math.round(ageGroups.reduce((acc, age) => acc + age.min, 0) / ageGroups.length);
  const averageMax = Math.round(ageGroups.reduce((acc, age) => acc + age.max, 0) / ageGroups.length);

  return `${averageMin}-${averageMax}`;
}

async function calculateAvgComments(instagram, youtube, tiktok) {
  const instagramComments = getNestedProperty(instagram, "profile.avgComments");
  const youtubeComments = getNestedProperty(youtube, "profile.avgComments");
  const tiktokComments = getNestedProperty(tiktok, "profile.avgComments");
  const avgComments = [instagramComments, youtubeComments, tiktokComments].filter(comment => comment != null);
  if (avgComments.length === 0) return null;
  return avgComments.reduce((acc, comment) => acc + comment, 0) / avgComments.length;
}

async function calculateAvgEngagementRate(instagram, youtube, tiktok) {
  const instagramEngagementRate = getNestedProperty(instagram, "profile.profile.engagementRate");
  const youtubeEngagementRate = getNestedProperty(youtube, "profile.profile.engagementRate");
  const tiktokEngagementRate = getNestedProperty(tiktok, "profile.profile.engagementRate");
  const avgEngagementRate = [instagramEngagementRate, youtubeEngagementRate, tiktokEngagementRate].filter(rate => rate != null);
  if (avgEngagementRate.length === 0) return null;
  return avgEngagementRate.reduce((acc, rate) => acc + rate, 0) / avgEngagementRate.length;
}

async function updateInfluencerData(influencer, profiles, options = {}) {
  const { instagram, youtube, tiktok } = profiles;
  const Name = getNestedProperty(instagram, "profile.profile.fullname") || getNestedProperty(youtube, "profile.profile.fullname") || getNestedProperty(tiktok, "profile.profile.fullname");
  const Gender = getNestedProperty(instagram, "profile.gender") || getNestedProperty(youtube, "profile.gender") || getNestedProperty(tiktok, "profile.gender");
  const MainContentLanguage = getNestedProperty(instagram, "profile.language.name")
  const CountryLocation = getNestedProperty(instagram, "profile.country") || getNestedProperty(youtube, "profile.country") || getNestedProperty(tiktok, "profile.country");
  const CityLocation = getNestedProperty(instagram, "profile.city") || getNestedProperty(youtube, "profile.city") || getNestedProperty(tiktok, "profile.city");
  const profilePicture = getNestedProperty(instagram, "profile.profile.picture") || getNestedProperty(youtube, "profile.profile.picture") || getNestedProperty(tiktok, "profile.profile.picture");
  const ageGroup = await calculateInfluencerAgeGroup(instagram, youtube, tiktok);
  const avgComments = await calculateAvgComments(instagram, youtube, tiktok);
  const engagementRate = await calculateAvgEngagementRate(instagram, youtube, tiktok);
  const interests = getNestedProperty(instagram, "profile.interests");
  const MainVertical = interests?.[0]?.name;
  const SubVertical = interests?.[1]?.name;
  const lastApiCall = new Date();

  logger.info(`Name: ${Name}`);
  logger.info(`Gender: ${Gender}`);
  logger.info(`MainContentLanguage: ${MainContentLanguage}`);
  logger.info(`CountryLocation: ${CountryLocation}`);
  logger.info(`CityLocation: ${CityLocation}`);
  logger.info(`profilePicture: ${profilePicture}`);
  logger.info(`ageGroup: ${ageGroup}`);
  logger.info(`avgComments: ${avgComments}`);
  logger.info(`engagementRate: ${engagementRate}`);
  logger.info(`MainVertical: ${MainVertical}`);
  logger.info(`SubVertical: ${SubVertical}`);
   


/*   const totalFollowers =
    (instagram?.followerCount || 0) +
    (youtube?.subscriberCount || 0) +
    (tiktok?.followerCount || 0);
  const totalEngagements = calculateTotalEngagements(
    instagram,
    youtube,
    tiktok
  );
  const averageEngagementRate = calculateAverageEngagementRate(
    instagram,
    youtube,
    tiktok
  );
  const totalPosts =
    (instagram?.postCount || 0) +
    (youtube?.videoCount || 0) +
    (tiktok?.postCount || 0);

  const updatedData = {
    TotalFollowers: totalFollowers,
    TotalEngagements: totalEngagements,
    AverageEngagementRate: averageEngagementRate,
    TotalPosts: totalPosts,
    AveragePostsPerWeek: averagePostsPerWeek,
    AverageLikesPerPost: calculateAverageLikesPerPost(
      instagram,
      youtube,
      tiktok
    ),
    AverageCommentsPerPost: calculateAverageCommentsPerPost(
      instagram,
      youtube,
      tiktok
    ),
    AverageViewsPerPost: calculateAverageViewsPerPost(
      instagram,
      youtube,
      tiktok
    ),
    EstimatedAudienceAge: aggregateAudienceAge(instagram, youtube, tiktok),
    EstimatedAudienceGender: aggregateAudienceGender(
      instagram,
      youtube,
      tiktok
    ),
    TopAudienceCountries: aggregateTopAudienceCountries(
      instagram,
      youtube,
      tiktok
    ),
    TopAudienceLanguages: aggregateTopAudienceLanguages(
      instagram,
      youtube,
      tiktok
    ),
    updatedAt: new Date(),
  }; */
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
    updatedAt: new Date(),
    lastApiCall: lastApiCall,
  }
  console.log(updatedData);

  // Pass transaction as part of options
  try{
  await influencer.update(updatedData, { ...options });
  logger.info(updatedData);
    logger.info(`This message is here. Updated influencer data for influencer ${influencer.id}`);
  } catch (error) {
    logger.error(`Error updating influencer data for influencer ${influencer.id}:`, error);
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
          
          await updateInfluencerData(influencer, {
            instagram: instagramData,
            youtube: youtubeData,
            tiktok: tiktokData,
          }, { transaction });  // Pass the transaction context here
        
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
