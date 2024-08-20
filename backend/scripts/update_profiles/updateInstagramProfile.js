const { getNestedProperty, logger } = require("../utilities");
const {
  InstagramAudienceDemographic,
  InstagramInterest,
  InstagramBrandAffinity,
  InstagramHashtag,
  InstagramMention,
  InstagramStatHistory,
  InstagramPost,
} = require("../../models");

async function updateInstagramProfile(profile, apiData) {
  if (!profile) {
    logger.error("Instagram profile is undefined");
    return;
  }

  const updatedData = {
    userId: getNestedProperty(apiData, "profile.userId"),
    fullName: getNestedProperty(apiData, "profile.profile.fullname"),
    profilePicture: getNestedProperty(apiData, "profile.profile.picture"),
    bio: getNestedProperty(apiData, "profile.bio"),
    isPrivate: getNestedProperty(apiData, "profile.isPrivate"),
    isVerified: getNestedProperty(apiData, "profile.isVerified"),
    accountType: getNestedProperty(apiData, "profile.accountType"),
    followerCount: getNestedProperty(apiData, "profile.profile.followers"),
    followingCount: getNestedProperty(apiData, "stats.followers.compared"),
    postCount: getNestedProperty(apiData, "profile.postsCount"),
    avgLikes: getNestedProperty(apiData, "profile.avgLikes"),
    avgComments: getNestedProperty(apiData, "profile.avgComments"),
    avgReelsPlays: getNestedProperty(apiData, "profile.avgReelsPlays"),
    engagementRate: getNestedProperty(
      apiData,
      "profile.profile.engagementRate"
    ),
    city: getNestedProperty(apiData, "profile.city"),
    country: getNestedProperty(apiData, "profile.country"),
    language: getNestedProperty(apiData, "profile.language.code"),
    gender: getNestedProperty(apiData, "profile.gender"),
    ageGroup: getNestedProperty(apiData, "profile.ageGroup"),
    paidPostPerformance: getNestedProperty(
      apiData,
      "profile.paidPostPerformance"
    ),
  };

  try {
    await profile.update(updatedData);
    logger.info(`Updated Instagram profile for user ${profile.username}`);

    // Update audience demographics
    try {
      console.log(
        "Starting updateAudienceDemographics for profile:",
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
          saveAll: false,
        },
        {
          type: "country",
          data:
            getNestedProperty(apiData, "profile.audience.geoCountries") || [],
          saveAll: false,
        },
        {
          type: "language",
          data: getNestedProperty(apiData, "profile.audience.languages") || [],
          saveAll: false,
        },
        {
          type: "ethnicity",
          data:
            getNestedProperty(apiData, "profile.audience.ethnicities") || [],
          saveAll: false,
        },
      ];

      console.log(
        "Audience Categories:",
        JSON.stringify(audienceCategories, null, 2)
      );

      // Delete existing demographics for this profile
      const deletedCount = await InstagramAudienceDemographic.destroy({
        where: { instagramProfileId: profile.id },
      });
      console.log(
        `Deleted ${deletedCount} existing demographics for profile ${profile.username}`
      );

      let totalSaved = 0;

      for (const category of audienceCategories) {
        const itemsToSave = category.saveAll
          ? category.data
          : getTopNItems(category.data, 3);
        console.log(`Processing ${category.type}: ${itemsToSave.length} items`);

        for (const item of itemsToSave) {
          try {
            const newDemographic = await InstagramAudienceDemographic.create({
              instagramProfileId: profile.id,
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
        `Total demographics saved for ${profile.username}: ${totalSaved}`
      );

      if (totalSaved === 0) {
        console.warn(
          `Warning: No demographics were saved for ${profile.username}`
        );
      }
    } catch (error) {
      console.error(
        `Unexpected error in updateAudienceDemographics for ${profile.username}: ${error.message}`
      );
      console.error(error.stack);
      throw error; // Re-throw the error to be handled by the caller
    }

    // Update interests
    try {
      logger.info(
        `Updating interests for Instagram profile ${profile.username}`
      );

      // Delete existing interests
      await InstagramInterest.destroy({
        where: { instagramProfileId: profile.id },
      });
      logger.info(
        `Deleted existing audience interests for Instagram profile ${profile.username}`
      );

      // Get interests from API data
      const allInterests =
        getNestedProperty(apiData, "profile.interests") || [];

      // Sort interests by weight (or another relevant property) and take top 5
      const topInterests = allInterests
        .sort((a, b) => (b.weight || 0) - (a.weight || 0))
        .slice(0, 5);

      // Create new interests
      for (const interest of topInterests) {
        await InstagramInterest.create({
          instagramProfileId: profile.id,
          interestId: interest.id,
          name: interest.name,
        });
      }

      logger.info(
        `Updated top 5 interests for Instagram profile ${profile.username}`
      );
    } catch (error) {
      logger.error(
        `Error updating interests for ${profile.username}: ${error.message}`
      );
      throw error;
    }

    // Update brand affinity
    try {
      logger.info(
        `Updating brand affinity for Instagram profile ${profile.username}`
      );

      // Delete existing brand affinity
      await InstagramBrandAffinity.destroy({
        where: { instagramProfileId: profile.id },
      });
      logger.info(
        `Deleted existing brand affinity for Instagram profile ${profile.username}`
      );

      // Get brand affinity from API data
      const allBrandAffinity =
        getNestedProperty(apiData, "profile.audience.brandAffinity") || [];

      // Sort brand affinity by weight and take top 5
      const topBrandAffinity = allBrandAffinity
        .sort((a, b) => (b.weight || 0) - (a.weight || 0))
        .slice(0, 5);

      // Create new brand affinity entries
      for (const brand of topBrandAffinity) {
        await InstagramBrandAffinity.create({
          instagramProfileId: profile.id,
          name: brand.name,
          weight: brand.weight,
        });
      }

      logger.info(
        `Updated top 5 brand affinity for Instagram profile ${profile.username}`
      );
    } catch (error) {
      logger.error(
        `Error updating brand affinity for ${profile.username}: ${error.message}`
      );
      throw error;
    }

    // Update hashtags
/*     const existingHashtags = await InstagramHashtag.findAll({
      where: { instagramProfileId: profile.id },
    });

    if (existingHashtags.length > 0) {
      await InstagramHashtag.destroy({
        where: { instagramProfileId: profile.id },
      });
      logger.info(
        `Deleted existing hashtags for Instagram profile ${profile.username}`
      );
    }

    const hashtags = getNestedProperty(apiData, "profile.hashtags") || [];
    for (const tag of hashtags) {
      await InstagramHashtag.findOrCreate({
        where: {
          instagramProfileId: profile.id,
          tag: tag.tag,
        },
        defaults: {
          instagramProfileId: profile.id,
          tag: tag.tag,
          weight: tag.weight,
        },
      });
    }
    logger.info(`Updated hashtags for Instagram profile ${profile.username}`); */

    // Update mentions
/*     const existingMentions = await InstagramMention.findAll({
      where: { instagramProfileId: profile.id },
    });

    if (existingMentions.length > 0) {
      await InstagramMention.destroy({
        where: { instagramProfileId: profile.id },
      });
      logger.info(
        `Deleted existing mentions for Instagram profile ${profile.username}`
      );
    }

    const mentions = getNestedProperty(apiData, "profile.mentions") || [];
    for (const mention of mentions) {
      await InstagramMention.findOrCreate({
        where: {
          instagramProfileId: profile.id,
          tag: mention.tag,
        },
        defaults: {
          instagramProfileId: profile.id,
          tag: mention.tag,
          weight: mention.weight,
        },
      });
    }
    logger.info(`Updated mentions for Instagram profile ${profile.username}`); */

    // Update stat history
/*     const existingStatHistory = await InstagramStatHistory.findAll({
      where: { instagramProfileId: profile.id },
    });

    if (existingStatHistory.length > 0) {
      await InstagramStatHistory.destroy({
        where: { instagramProfileId: profile.id },
      });
      logger.info(
        `Deleted existing stat history for Instagram profile ${profile.username}`
      );
    }

    const statHistory = getNestedProperty(apiData, "profile.statHistory") || [];
    for (const stat of statHistory) {
      await InstagramStatHistory.findOrCreate({
        where: {
          instagramProfileId: profile.id,
          month: new Date(stat.month),
        },
        defaults: {
          instagramProfileId: profile.id,
          month: new Date(stat.month),
          followers: stat.followers,
          following: stat.following,
          avgLikes: stat.avgLikes,
          avgViews: stat.avgViews,
          avgComments: stat.avgComments,
        },
      });
    }
    logger.info(
      `Updated stat history for Instagram profile ${profile.username}`
    );
 */
    // Update posts
/*     const existingPosts = await InstagramPost.findAll({
      where: { instagramProfileId: profile.id },
    });

    if (existingPosts.length > 0) {
      await InstagramPost.destroy({
        where: { instagramProfileId: profile.id },
      });
      logger.info(
        `Deleted existing posts for Instagram profile ${profile.username}`
      );
    }

    const recentPosts = getNestedProperty(apiData, "profile.recentPosts") || [];
    const popularPosts =
      getNestedProperty(apiData, "profile.popularPosts") || [];
    const sponsoredPosts =
      getNestedProperty(apiData, "profile.sponsoredPosts") || [];
    const allPosts = [...recentPosts, ...popularPosts, ...sponsoredPosts];

    for (const post of allPosts) {
      await InstagramPost.findOrCreate({
        where: {
          instagramProfileId: profile.id,
          postId: post.id,
        },
        defaults: {
          instagramProfileId: profile.id,
          postId: post.id,
          text: post.text,
          url: post.url,
          created: new Date(post.created),
          thumbnail: post.thumbnail,
          likes: post.likes,
          comments: post.comments,
          views: post.plays,
          type: sponsoredPosts.includes(post)
            ? "sponsored"
            : popularPosts.includes(post)
            ? "popular"
            : "recent",
          mentions: JSON.stringify(post.mentions),
          hashtags: JSON.stringify(post.hashtags),
          //if post.type is photo then set video to false else set image to true
          video: post.type === "photo" ? false : true,
          image: post.type === "photo" ? true : false,
        },
      });
    } */
    
      logger.info(`Updated posts for Instagram profile ${profile.username}`);
  } catch (error) {
    logger.error(
      `Error updating Instagram profile for ${profile.username}:`,
      error
    );
    throw error;
  }
}

// Helper function to get top N items
function getTopNItems(items, n) {
  return items.sort((a, b) => b.weight - a.weight).slice(0, n);
}

module.exports = { updateInstagramProfile };
