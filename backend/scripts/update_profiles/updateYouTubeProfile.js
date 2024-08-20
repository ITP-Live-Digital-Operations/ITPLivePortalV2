const { getNestedProperty, logger } = require("../utilities");
const {
  YouTubeAudienceDemographic,
  YouTubeInterest,
  YouTubeStatHistory,
  YouTubeVideo,
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
    logger.info(`Updated YouTube profile for user ${profile.username}`);

    // Update audience demographics
    await updateAudienceDemographics(profile, apiData);

    // Update interests
    await updateInterests(profile, apiData);

    // Update stat history
    const existingStatHistory = await YouTubeStatHistory.findAll({
      where: { youtubeProfileId: profile.id },
    });

    if (existingStatHistory.length > 0) {
      await YouTubeStatHistory.destroy({
        where: { youtubeProfileId: profile.id },
      });
      logger.info(
        `Deleted existing stat history for YouTube profile ${profile.username}`
      );
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
      where: { youtubeProfileId: profile.id },
    });

    if (existingVideos.length > 0) {
      await YouTubeVideo.destroy({
        where: { youtubeProfileId: profile.id },
      });
      logger.info(
        `Deleted existing videos for YouTube profile ${profile.username}`
      );
    }

    const recentVideos =
      getNestedProperty(apiData, "profile.recentPosts") || [];
    const popularVideos =
      getNestedProperty(apiData, "profile.popularPosts") || [];
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
    logger.error(
      `Error updating YouTube profile for ${profile.username}:`,
      error
    );
    throw error;
  }
}

// Functions to save data
async function updateAudienceDemographics(profile, apiData) {
  try {
    console.log(
      "Starting updateAudienceDemographics for YouTube profile:",
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
    const deletedCount = await YouTubeAudienceDemographic.destroy({
      where: { youtubeProfileId: profile.id },
    });
    console.log(
      `Deleted ${deletedCount} existing demographics for YouTube profile ${profile.username}`
    );

    let totalSaved = 0;

    for (const category of audienceCategories) {
      const itemsToSave = category.saveAll
        ? category.data
        : getTopNItems(category.data, 3);
      console.log(`Processing ${category.type}: ${itemsToSave.length} items`);

      for (const item of itemsToSave) {
        try {
          const newDemographic = await YouTubeAudienceDemographic.create({
            youtubeProfileId: profile.id,
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
      `Successfully updated ${totalSaved} audience demographics for YouTube profile ${profile.username}`
    );
  } catch (error) {
    console.error(
      `Error updating audience demographics for ${profile.username}: ${error.message}`
    );
    throw error;
  }
}

async function updateInterests(profile, apiData) {
  try {
    console.log(
      "Starting updateInterests for YouTube profile:",
      profile.username
    );
    console.log("API Data:", JSON.stringify(apiData, null, 2));

    // Delete existing interests for this profile
    const deletedCount = await YouTubeInterest.destroy({
      where: { youtubeProfileId: profile.id },
    });
    console.log(
      `Deleted ${deletedCount} existing interests for YouTube profile ${profile.username}`
    );

    const interests = getNestedProperty(apiData, "profile.interests") || [];
    const topInterests = getTopNItems(interests, 5);

    console.log(`Processing top 5 interests: ${topInterests.length} items`);

    let totalSaved = 0;

    for (const interest of topInterests) {
      try {
        const newInterest = await YouTubeInterest.create({
          youtubeProfileId: profile.id,
          interestId: interest.id,
          name: interest.name,
          weight: interest.weight, // Adding weight to the saved data
        });
        console.log(
          `Saved interest: ${JSON.stringify(newInterest.toJSON())}`
        );
        totalSaved++;
      } catch (error) {
        console.error(
          `Error saving interest for ${profile.username}: ${error.message}`
        );
        console.error("Failed item:", JSON.stringify(interest));
        // Optionally, you can choose to continue with the loop or throw the error
        // throw error;
      }
    }

    console.log(
      `Successfully updated ${totalSaved} interests for YouTube profile ${profile.username}`
    );
  } catch (error) {
    console.error(
      `Error updating interests for ${profile.username}: ${error.message}`
    );
    throw error;
  }
}

// Function to get top N items from an array, sorted by weight
function getTopNItems(items, n) {
  return items.sort((a, b) => b.weight - a.weight).slice(0, n);
}

module.exports = { updateYouTubeProfile };
