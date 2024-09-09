const { AbstractQuery } = require("sequelize/lib/dialects/abstract/query");
const models = require("../../models");
const { Op } = require("sequelize");
const Influencer = models.Influencer;
// import influencer models
const InstagramProfile = models.InstagramProfile;
const InstagramAudienceDemographic = models.InstagramAudienceDemographic;
const InstagramInterest = models.InstagramInterest;
const InstagramBrandAffinity = models.InstagramBrandAffinity;
const InstagramHashtag = models.InstagramHashtag;
const InstagramMention = models.InstagramMention;
const InstagramStatHistory = models.InstagramStatHistory;

const YouTubeProfile = models.YouTubeProfile;
const YouTubeAudienceDemographic = models.YouTubeAudienceDemographic;
const YouTubeInterest = models.YouTubeInterest;
const YouTubeStatHistory = models.YouTubeStatHistory;
const YouTubeVideo = models.YouTubeVideo;
const TikTokProfile = models.TikTokProfile;
const TikTokAudienceDemographic = models.TikTokAudienceDemographic;
const TikTokInterest = models.TikTokInterest;
const TikTokStatHistory = models.TikTokStatHistory;
const TikTokVideo = models.TikTokVideo;
const Log = models.Log;
const logItem = models.logItem;
const Package = models.Package;
const InfluencerRating = models.InfluencerRating;
const User = models.User;
const InfluencerStatistics = models.InfluencerStatistics;
const InfluencerMetrics = models.influencerMetrics;
const InfluencerRemarks = models.influencerRemarks;

const { updateInfluencers } = require("../../scripts/updateInfluencers");

exports.getInfluencerProfileV2 = async (req, res) => {
  const influencerId = Number(req.params.id);
  console.log(influencerId);
  try {
    let influencer = await Influencer.findByPk(influencerId, {
      include: [
        {
          model: InstagramProfile,

          as: "instagramProfile", // Ensure this matches the alias in the model
        },
        {
          model: YouTubeProfile,
          as: "youtubeProfile", // Ensure this matches the alias in the model
        },
        {
          model: TikTokProfile,
          as: "tiktokProfile", // Ensure this matches the alias in the mode
        },
        {
          model: InfluencerRating,
          as: "influencerRating", // Ensure this matches the alias in the model
        },
        {
          model: User,
          as: "user", // Ensure this matches the alias in the model
          attributes: ["id", "name"],
        },
        {
          model: InfluencerStatistics,
          as: "influencerStatistics", // Ensure this matches the alias in the model
        },
        {
          model: InfluencerMetrics,
          as: "influencerMetrics", // Ensure this matches the alias in the model
        },
      ],
    });

    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    // Check if lastApiCall is null or older than 30 days
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    if (
      !influencer.lastApiCall ||
      new Date(influencer.lastApiCall) < thirtyDaysAgo
    ) {
      // Logic to update influencer information
      console.log("Updating influencer data...");

      await updateInfluencers(1, influencerId);

      // Refetch the updated influencer data
      influencer = await Influencer.findByPk(influencerId, {
        include: [
          {
            model: InstagramProfile,
            as: "instagramProfile",
          },
          {
            model: YouTubeProfile,
            as: "youtubeProfile",
          },
          {
            model: TikTokProfile,
            as: "tiktokProfile",
          },
          {
            model: InfluencerRating,
            as: "influencerRating",
          },
          {
            model: User,
            as: "user",
            attributes: ["id", "name"],
          },
          {
            model: InfluencerStatistics,
            as: "influencerStatistics",
          },
          {
            model: InfluencerMetrics,
            as: "influencerMetrics",
          },
        ],
      });
    }

    res.json(influencer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateInfluencerProfileV2 = async (req, res) => {
  const influencerId = Number(req.params.id);
  try {
    await updateInfluencers(1, influencerId);
    res.json({ message: `Successfully updated influencer ${influencerId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getInstagramProfile = async (req, res) => {
  const profileId = Number(req.params.id);
  try {
    const profile = await InstagramProfile.findByPk(profileId, {
      include: [
        {
          model: InstagramAudienceDemographic,
          as: "InstagramAudienceDemographic",
        },
        { model: InstagramBrandAffinity, as: "InstagramBrandAffinity" },
      ],
    });
    if (!profile) {
      return res.status(404).json({ message: "Instagram profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getYouTubeProfile = async (req, res) => {
  const profileId = Number(req.params.id);
  try {
    const profile = await YouTubeProfile.findByPk(profileId, {
      include: [
        { model: YouTubeAudienceDemographic, as: "YouTubeAudienceDemographic" },
        { model: YouTubeInterest, as: "YouTubeInterest" },
        { model: YouTubeStatHistory, as: "YouTubeStatHistory" },
        { model: YouTubeVideo, as: "YouTubeVideo" },
      ],
    });
    if (!profile) {
      return res.status(404).json({ message: "YouTube profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getTikTokProfile = async (req, res) => {
  const profileId = Number(req.params.id);
  try {
    const profile = await TikTokProfile.findByPk(profileId, {
      include: [
        { model: TikTokAudienceDemographic, as: "TikTokAudienceDemographic" },
        { model: TikTokInterest, as: "TikTokInterest" },
        { model: TikTokStatHistory, as: "TikTokStatHistory" },
        { model: TikTokVideo, as: "TikTokVideo" },
      ],
    });
    if (!profile) {
      return res.status(404).json({ message: "TikTok profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getModashProfile = async (req, res) => {
  const profileId = Number(req.params.id);
  try {
    const profile = await Influencer.findByPk(profileId, {
      attributes: ["id", "Name"],
      include: [
        {
          model: InstagramProfile,
          as: "instagramProfile",
          attributes: ["id", "username", "profilePicture" ,"followerCount", "avgLikes", "engagementRate"],
          include: [
            {
              model: InstagramAudienceDemographic,
              as: "InstagramAudienceDemographic",
              attributes: ["type", "code", "name", "weight"],
              where: {
                [Op.or]: [
                  { type: "gender" },
                  { type: "country" },
                  { type: "gendersPerAge" }
                ]
              }
            },
            {
              model: InstagramInterest,
              as: "InstagramInterest",
              attributes: ["name", "weight"]
            },
          ],
        },
      ],
    });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile); // Return the profile data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};