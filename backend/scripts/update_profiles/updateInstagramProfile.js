const { getNestedProperty, logger } = require("../utilities");
const {
  InstagramAudienceDemographic,
  InstagramInterest,
  InstagramBrandAffinity,
  InstagramHashtag,
  InstagramMention,
  InstagramStatHistory,
  InstagramPost
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
    const audienceDemographics = [
      ...(getNestedProperty(apiData, "profile.audience.genders") || []),
      ...(getNestedProperty(apiData, "profile.audience.ages") || []),
      ...(getNestedProperty(apiData, "profile.audience.geoCountries") || []),
      ...(getNestedProperty(apiData, "profile.audience.languages") || []),
      ...(getNestedProperty(apiData, "profile.audience.ethnicities") || []),
    ].map((item) => ({
      instagramProfileId: profile.id,
      type: item.code ? (item.name ? "language" : "demographic") : "country",
      code: item.code || item.name,
      name: item.name,
      weight: item.weight,
    }));

    // Check if any InstagramAudienceDemographic entries exist and destroy them
    const existingDemographics = await InstagramAudienceDemographic.findAll({
      where: { instagramProfileId: profile.id }
    });

    if (existingDemographics.length > 0) {
      await InstagramAudienceDemographic.destroy({
        where: { instagramProfileId: profile.id }
      });
      logger.info(`Deleted existing audience demographics for Instagram profile ${profile.username}`);
    }

    

    for (const demo of audienceDemographics) {
      await InstagramAudienceDemographic.findOrCreate({
        where: {
          instagramProfileId: profile.id,
          type: demo.type,
          code: demo.code,
        },
        defaults: demo,
      });
    }
    logger.info(
      `Updated audience demographics for Instagram profile ${profile.username}`
    );

    // Update interests
    const existingInterests = await InstagramInterest.findAll({
      where: { instagramProfileId: profile.id }
    });

    if (existingInterests.length > 0) {
      await InstagramInterest.destroy({
        where: { instagramProfileId: profile.id }
      });
      logger.info(`Deleted existing audience interests for Instagram profile ${profile.username}`);
    }

    const interests = getNestedProperty(apiData, "  ") || [];
    for (const interest of interests) {
      await InstagramInterest.findOrCreate({
        where: {
          instagramProfileId: profile.id,
          interestId: interest.id,
        },
        defaults: {
          instagramProfileId: profile.id,
          interestId: interest.id,
          name: interest.name,
        },
      });
    }
    logger.info(`Updated interests for Instagram profile ${profile.username}`);

    // Update brand affinity
    const existingBrandAffinity = await InstagramBrandAffinity.findAll({
      where: { instagramProfileId: profile.id }
    });

    if (existingBrandAffinity.length > 0) {
      await InstagramBrandAffinity.destroy({
        where: { instagramProfileId: profile.id }
      });
      logger.info(`Deleted existing brand affinity for Instagram profile ${profile.username}`);
    }

    const brandAffinity =
      getNestedProperty(apiData, "profile.audience.brandAffinity") || [];
    for (const brand of brandAffinity) {
      await InstagramBrandAffinity.findOrCreate({
        where: {
          instagramProfileId: profile.id,
          name: brand.name,
        },
        defaults: {
          instagramProfileId: profile.id,
          name: brand.name,
          weight: brand.weight,
        },
      });
    }
    logger.info(
      `Updated brand affinity for Instagram profile ${profile.username}`
    );

    // Update hashtags
    const existingHashtags = await InstagramHashtag.findAll({
      where: { instagramProfileId: profile.id }
    });

    if (existingHashtags.length > 0) {
      await InstagramHashtag.destroy({
        where: { instagramProfileId: profile.id }
      });
      logger.info(`Deleted existing hashtags for Instagram profile ${profile.username}`);
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
    logger.info(`Updated hashtags for Instagram profile ${profile.username}`);

    // Update mentions
    const existingMentions = await InstagramMention.findAll({
      where: { instagramProfileId: profile.id }
    });

    if (existingMentions.length > 0) {
      await InstagramMention.destroy({
        where: { instagramProfileId: profile.id }
      });
      logger.info(`Deleted existing mentions for Instagram profile ${profile.username}`);
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
    logger.info(`Updated mentions for Instagram profile ${profile.username}`);

    // Update stat history
    const existingStatHistory = await InstagramStatHistory.findAll({
      where: { instagramProfileId: profile.id }
    });

    if (existingStatHistory.length > 0) {
      await InstagramStatHistory.destroy({
        where: { instagramProfileId: profile.id }
      });
      logger.info(`Deleted existing stat history for Instagram profile ${profile.username}`);
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

    // Update posts
    const existingPosts = await InstagramPost.findAll({
      where: { instagramProfileId: profile.id }
    });

    if (existingPosts.length > 0) {
      await InstagramPost.destroy({
        where: { instagramProfileId: profile.id }
      });
      logger.info(`Deleted existing posts for Instagram profile ${profile.username}`);
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
    }
    logger.info(`Updated posts for Instagram profile ${profile.username}`);
  } catch (error) {
    logger.error(
      `Error updating Instagram profile for ${profile.username}:`,
      error
    );
    throw error;
  }
}

module.exports = { updateInstagramProfile };
