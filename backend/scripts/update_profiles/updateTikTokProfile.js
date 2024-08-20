const { getNestedProperty, logger } = require("../utilities");
const {
  TikTokAudienceDemographic,
  TikTokInterest,
  TikTokStatHistory,
  TikTokVideo,
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
    followingCount: getNestedProperty(
      apiData,
      "profile.statHistory[0].following"
    ),
    postCount: getNestedProperty(apiData, "profile.postsCount"),
    avgLikes: getNestedProperty(apiData, "profile.avgLikes"),
    avgViews: getNestedProperty(apiData, "profile.profile.averageViews"),
    avgComments: getNestedProperty(apiData, "profile.avgComments"),
    totalLikes: getNestedProperty(apiData, "profile.totalLikes"),
    engagementRate: getNestedProperty(
      apiData,
      "profile.profile.engagementRate"
    ),
    city: getNestedProperty(apiData, "profile.city"),
    country: getNestedProperty(apiData, "profile.country"),
    gender: getNestedProperty(apiData, "profile.gender"),
    ageGroup: getNestedProperty(apiData, "profile.ageGroup"),
  };

  try {
    await profile.update(updatedData);
    logger.info(`Updated TikTok profile for user ${profile.username}`);

    // Update audience demographics
    await updateAudienceDemographics(profile, apiData);
    // Update interests
    const existingInterests = await TikTokInterest.findAll({
      where: { tiktokProfileId: profile.id },
    });

    if (existingInterests.length > 0) {
      await TikTokInterest.destroy({
        where: { tiktokProfileId: profile.id },
      });
      logger.info(
        `Deleted existing interests for TikTok profile ${profile.username}`
      );
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
      where: { tiktokProfileId: profile.id },
    });

    if (existingStatHistory.length > 0) {
      await TikTokStatHistory.destroy({
        where: { tiktokProfileId: profile.id },
      });
      logger.info(
        `Deleted existing stat history for TikTok profile ${profile.username}`
      );
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
      where: { tiktokProfileId: profile.id },
    });

    if (existingVideos.length > 0) {
      await TikTokVideo.destroy({
        where: { tiktokProfileId: profile.id },
      });
      logger.info(
        `Deleted existing videos for TikTok profile ${profile.username}`
      );
    }

    const recentVideos =
      getNestedProperty(apiData, "profile.recentPosts") || [];
    const popularVideos =
      getNestedProperty(apiData, "profile.popularPosts") || [];
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
    logger.error(
      `Error updating TikTok profile for ${profile.username}:`,
      error
    );
    throw error;
  }
}

//functions to save data
async function updateAudienceDemographics(profile, apiData) {
  try {
    console.log(
      "Starting updateAudienceDemographics for TikTok profile:",
      profile.username
    );
    console.log("API Data:", JSON.stringify(apiData, null, 2));

    const audienceCategories = [
      {
        type: "gender",
        data: getNestedProperty(apiData, "profile.audience.genders") || [],
        saveAll: true,
      },
      {
        type: "age",
        data: getNestedProperty(apiData, "profile.audience.ages") || [],
        saveAll: true,
      },
      {
        type: "country",
        data: getNestedProperty(apiData, "profile.audience.geoCountries") || [],
        saveAll: false,
      },
      {
        type: "language",
        data: getNestedProperty(apiData, "profile.audience.languages") || [],
        saveAll: false,
      },
    ];

    console.log(
      "Audience Categories:",
      JSON.stringify(audienceCategories, null, 2)
    );

    // Delete existing demographics for this profile
    const deletedCount = await TikTokAudienceDemographic.destroy({
      where: { tiktokProfileId: profile.id },
    });
    console.log(
      `Deleted ${deletedCount} existing demographics for TikTok profile ${profile.username}`
    );

    let totalSaved = 0;

    for (const category of audienceCategories) {
      const itemsToSave = category.saveAll
        ? category.data
        : getTopNItems(category.data, 3);
      console.log(`Processing ${category.type}: ${itemsToSave.length} items`);

      for (const item of itemsToSave) {
        try {
          const newDemographic = await TikTokAudienceDemographic.create({
            tiktokProfileId: profile.id,
            type: category.type,
            code:
              item.code ||
              (category.type === "country" ? item.code : item.name),
            name: item.name || null,
            weight: item.weight,
          });
          console.log(
            `Saved demographic: ${JSON.stringify(newDemographic.toJSON())}`
          );
          totalSaved++;
        } catch (error) {
          console.error(
            `Error saving demographic for ${profile.username}: ${error.message}`
          );
          console.error("Failed item:", JSON.stringify(item));
          // Optionally, you can choose to continue with the loop or throw the error
          // throw error;
        }
      }
    }

    console.log(
      `Successfully updated ${totalSaved} audience demographics for TikTok profile ${profile.username}`
    );
  } catch (error) {
    console.error(
      `Error updating audience demographics for ${profile.username}: ${error.message}`
    );
    throw error;
  }
}

// Helper function to get top N items
function getTopNItems(items, n) {
  return items.sort((a, b) => b.weight - a.weight).slice(0, n);
}

module.exports = { updateTikTokProfile };
