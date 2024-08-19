const { getNestedProperty, logger } = require("../utilities");
const {
  TikTokAudienceDemographic,
  TikTokInterest,
  TikTokStatHistory,
  TikTokVideo
} = require("../../models");

async function updateTikTokProfile(profile, apiData) {
  if (!profile) {
    logger.error("TikTok profile is undefined");
    return;
  }

  const updatedData = {
    userId: getNestedProperty(apiData, "profile.userId"),
    secUid: getNestedProperty(apiData, "profile.secUid"),
    fullName: getNestedProperty(apiData, "profile.profile.fullname"),
    profilePicture: getNestedProperty(apiData, "profile.profile.picture"),
    bio: getNestedProperty(apiData, "profile.bio"),
    isPrivate: getNestedProperty(apiData, "profile.isPrivate"),
    isVerified: getNestedProperty(apiData, "profile.isVerified"),
    followerCount: getNestedProperty(apiData, "profile.profile.followers"),
    followingCount: getNestedProperty(apiData, "profile.statHistory[0].following"),
    postCount: getNestedProperty(apiData, "profile.postsCount"),
    avgLikes: getNestedProperty(apiData, "profile.avgLikes"),
    avgViews: getNestedProperty(apiData, "profile.profile.averageViews"),
    avgComments: getNestedProperty(apiData, "profile.avgComments"),
    totalLikes: getNestedProperty(apiData, "profile.totalLikes"),
    engagementRate: getNestedProperty(apiData, "profile.profile.engagementRate"),
    city: getNestedProperty(apiData, "profile.city"),
    country: getNestedProperty(apiData, "profile.country"),
    gender: getNestedProperty(apiData, "profile.gender"),
    ageGroup: getNestedProperty(apiData, "profile.ageGroup"),
  };

  try {
    await profile.update(updatedData);
    logger.info(`Updated TikTok profile for user ${profile.username}`);

    // Update audience demographics
    const existingDemographics = await TikTokAudienceDemographic.findAll({
      where: { tiktokProfileId: profile.id }
    });

    if (existingDemographics.length > 0) {
      await TikTokAudienceDemographic.destroy({
        where: { tiktokProfileId: profile.id }
      });
      logger.info(`Deleted existing audience demographics for TikTok profile ${profile.username}`);
    }

    const audienceDemographics = [
      ...(getNestedProperty(apiData, "profile.audience.genders") || []),
      ...(getNestedProperty(apiData, "profile.audience.ages") || []),
      ...(getNestedProperty(apiData, "profile.audience.geoCountries") || []),
      ...(getNestedProperty(apiData, "profile.audience.languages") || []),
    ];

    for (const demo of audienceDemographics) {
      await TikTokAudienceDemographic.create({
        tiktokProfileId: profile.id,
        type: demo.code ? (demo.name ? "language" : "demographic") : "country",
        code: demo.code || demo.name,
        name: demo.name,
        weight: demo.weight,
      });
    }
    logger.info(`Updated audience demographics for TikTok profile ${profile.username}`);

    // Update interests
    const existingInterests = await TikTokInterest.findAll({
      where: { tiktokProfileId: profile.id }
    });

    if (existingInterests.length > 0) {
      await TikTokInterest.destroy({
        where: { tiktokProfileId: profile.id }
      });
      logger.info(`Deleted existing interests for TikTok profile ${profile.username}`);
    }

    const interests = getNestedProperty(apiData, "profile.interests") || [];
    for (const interest of interests) {
      await TikTokInterest.create({
        tiktokProfileId: profile.id,
        interestId: interest.id,
        name: interest.name,
      });
    }
    logger.info(`Updated interests for TikTok profile ${profile.username}`);

    // Update stat history
    const existingStatHistory = await TikTokStatHistory.findAll({
      where: { tiktokProfileId: profile.id }
    });

    if (existingStatHistory.length > 0) {
      await TikTokStatHistory.destroy({
        where: { tiktokProfileId: profile.id }
      });
      logger.info(`Deleted existing stat history for TikTok profile ${profile.username}`);
    }

    const statHistory = getNestedProperty(apiData, "profile.statHistory") || [];
    for (const stat of statHistory) {
      await TikTokStatHistory.create({
        tiktokProfileId: profile.id,
        month: new Date(stat.month),
        followers: stat.followers,
        following: stat.following,
        avgLikes: stat.avgLikes,
        avgViews: stat.avgViews,
        avgComments: stat.avgComments,
      });
    }
    logger.info(`Updated stat history for TikTok profile ${profile.username}`);

    // Update videos
    const existingVideos = await TikTokVideo.findAll({
      where: { tiktokProfileId: profile.id }
    });

    if (existingVideos.length > 0) {
      await TikTokVideo.destroy({
        where: { tiktokProfileId: profile.id }
      });
      logger.info(`Deleted existing videos for TikTok profile ${profile.username}`);
    }

    const recentVideos = getNestedProperty(apiData, "profile.recentPosts") || [];
    const popularVideos = getNestedProperty(apiData, "profile.popularPosts") || [];
    const allVideos = [...recentVideos, ...popularVideos];

    for (const video of allVideos) {
      await TikTokVideo.create({
        tiktokProfileId: profile.id,
        videoId: video.id,
        text: video.text,
        url: video.url,
        created: new Date(video.created),
        thumbnail: video.thumbnail,
        likes: video.likes,
        comments: video.comments,
        views: video.views,
        video: video.video,
        type: popularVideos.includes(video) ? "popular" : "recent",
      });
    }
    logger.info(`Updated videos for TikTok profile ${profile.username}`);
  } catch (error) {
    logger.error(`Error updating TikTok profile for ${profile.username}:`, error);
    throw error;
  }
}

module.exports = { updateTikTokProfile };