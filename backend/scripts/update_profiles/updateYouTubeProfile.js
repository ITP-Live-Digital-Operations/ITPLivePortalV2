const { getNestedProperty, logger } = require("../utilities");
const {
  YouTubeAudienceDemographic,
  YouTubeInterest,
  YouTubeStatHistory,
  YouTubeVideo
} = require("../../models");

async function updateYouTubeProfile(profile, apiData) {
  if (!profile) {
    logger.error("YouTube profile is undefined");
    return;
  }

  const updatedData = {
    userId: getNestedProperty(apiData, "profile.userId"),
    fullName: getNestedProperty(apiData, "profile.profile.fullname"),
    profilePicture: getNestedProperty(apiData, "profile.profile.picture"),
    description: getNestedProperty(apiData, "profile.description"),
    isVerified: getNestedProperty(apiData, "profile.isVerified"),
    subscriberCount: getNestedProperty(apiData, "profile.profile.followers"),
    videoCount: getNestedProperty(apiData, "profile.postsCount"),
    avgViews: getNestedProperty(apiData, "profile.profile.averageViews"),
    avgLikes: getNestedProperty(apiData, "profile.avgLikes"),
    avgComments: getNestedProperty(apiData, "profile.avgComments"),
    totalViews: getNestedProperty(apiData, "profile.totalViews"),
    engagementRate: getNestedProperty(apiData, "profile.profile.engagementRate"),
    city: getNestedProperty(apiData, "profile.city"),
    country: getNestedProperty(apiData, "profile.country"),
    gender: getNestedProperty(apiData, "profile.gender"),
    ageGroup: getNestedProperty(apiData, "profile.ageGroup"),
  };

  try {
    await profile.update(updatedData);
    logger.info(`Updated YouTube profile for user ${profile.username}`);

    // Update audience demographics
    const existingDemographics = await YouTubeAudienceDemographic.findAll({
      where: { youtubeProfileId: profile.id }
    });

    if (existingDemographics.length > 0) {
      await YouTubeAudienceDemographic.destroy({
        where: { youtubeProfileId: profile.id }
      });
      logger.info(`Deleted existing audience demographics for YouTube profile ${profile.username}`);
    }

    const audienceDemographics = [
      ...(getNestedProperty(apiData, "profile.audience.genders") || []),
      ...(getNestedProperty(apiData, "profile.audience.ages") || []),
      ...(getNestedProperty(apiData, "profile.audience.geoCountries") || []),
      ...(getNestedProperty(apiData, "profile.audience.languages") || []),
    ];

    for (const demo of audienceDemographics) {
      await YouTubeAudienceDemographic.create({
        youtubeProfileId: profile.id,
        type: demo.code ? (demo.name ? "language" : "demographic") : "country",
        code: demo.code || demo.name,
        name: demo.name,
        weight: demo.weight,
      });
    }
    logger.info(`Updated audience demographics for YouTube profile ${profile.username}`);

    // Update interests
    const existingInterests = await YouTubeInterest.findAll({
      where: { youtubeProfileId: profile.id }
    });

    if (existingInterests.length > 0) {
      await YouTubeInterest.destroy({
        where: { youtubeProfileId: profile.id }
      });
      logger.info(`Deleted existing interests for YouTube profile ${profile.username}`);
    }

    const interests = getNestedProperty(apiData, "profile.interests") || [];
    for (const interest of interests) {
      await YouTubeInterest.create({
        youtubeProfileId: profile.id,
        interestId: interest.id,
        name: interest.name,
      });
    }
    logger.info(`Updated interests for YouTube profile ${profile.username}`);

    // Update stat history
    const existingStatHistory = await YouTubeStatHistory.findAll({
      where: { youtubeProfileId: profile.id }
    });

    if (existingStatHistory.length > 0) {
      await YouTubeStatHistory.destroy({
        where: { youtubeProfileId: profile.id }
      });
      logger.info(`Deleted existing stat history for YouTube profile ${profile.username}`);
    }

    const statHistory = getNestedProperty(apiData, "profile.statHistory") || [];
    for (const stat of statHistory) {
      await YouTubeStatHistory.create({
        youtubeProfileId: profile.id,
        month: new Date(stat.month),
        followers: stat.followers,
        following: stat.following,
        avgLikes: stat.avgLikes,
        avgViews: stat.avgViews,
        avgComments: stat.avgComments,
      });
    }
    logger.info(`Updated stat history for YouTube profile ${profile.username}`);

    // Update videos
    const existingVideos = await YouTubeVideo.findAll({
      where: { youtubeProfileId: profile.id }
    });

    if (existingVideos.length > 0) {
      await YouTubeVideo.destroy({
        where: { youtubeProfileId: profile.id }
      });
      logger.info(`Deleted existing videos for YouTube profile ${profile.username}`);
    }

    const recentVideos = getNestedProperty(apiData, "profile.recentPosts") || [];
    const popularVideos = getNestedProperty(apiData, "profile.popularPosts") || [];
    const allVideos = [...recentVideos, ...popularVideos];

    for (const video of allVideos) {
      await YouTubeVideo.create({
        youtubeProfileId: profile.id,
        videoId: video.id,
        title: video.title,
        description: video.text,
        url: video.url,
        created: new Date(video.created),
        thumbnail: video.thumbnail,
        likes: video.likes,
        comments: video.comments,
        views: video.views,
        type: popularVideos.includes(video) ? "popular" : "recent",
      });
    }
    logger.info(`Updated videos for YouTube profile ${profile.username}`);
  } catch (error) {
    logger.error(`Error updating YouTube profile for ${profile.username}:`, error);
    throw error;
  }
}

module.exports = { updateYouTubeProfile };