const models = require("../../models");
const Influencer = models.Influencer;
// import influencer models
const InstagramProfile = models.InstagramProfile;

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
const { updateInfluencers } = require("../../scripts/updateInfluencers")
exports.getInfluencerProfileV2 = async (req, res) => {
  const influencerId = Number(req.params.id);
  console.log(influencerId);
  try {
    const influencer = await Influencer.findByPk(influencerId, {
      include: [
        {
          model: InstagramProfile,
          
          as: "instagramProfile", // Ensure this matches the alias in the model
          /* include: [
            { model: InstagramAudienceDemographic, as: "InstagramAudienceDemographic" },
            { model: InstagramInterest, as: "InstagramInterest" },
            { model: InstagramBrandAffinity, as: "InstagramBrandAffinity" },
            { model: InstagramHashtag, as: "InstagramHashtag" },
            { model: InstagramMention, as: "InstagramMention" },
            { model: InstagramStatHistory, as: "InstagramStatHistory" },
          ] */
        },
        {
          model: YouTubeProfile,
          as: "youtubeProfile", // Ensure this matches the alias in the model
          /* include: [
            { model: YouTubeAudienceDemographic, as: "YouTubeAudienceDemographic" },
            { model: YouTubeInterest, as: "YouTubeInterest" },
            { model: YouTubeStatHistory, as: "YouTubeStatHistory" },
          ] */
        },
        {
          model: TikTokProfile,
          as: "tiktokProfile", // Ensure this matches the alias in the model
          /* include: [
            { model: TikTokAudienceDemographic, as: "TikTokAudienceDemographic" },
            { model: TikTokInterest, as: "TikTokInterest" },
            { model: TikTokStatHistory, as: "TikTokStatHistory" },
          ] */
        },
        {
          model: InfluencerRating,
          as: "influencerRating" // Ensure this matches the alias in the model
        },
        {
          model: User,
          as: "user", // Ensure this matches the alias in the model
          attributes: ['id', 'name'],
        },
        {
          model: InfluencerStatistics,
          as: "influencerStatistics" // Ensure this matches the alias in the model
        },
        {
          model: InfluencerMetrics,
          as: "influencerMetrics" // Ensure this matches the alias in the model
        }
      ]
    });

    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
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
}

exports.getInstagramProfile = async (req, res) => {
  const profileId = Number(req.params.id);
  try {
    const profile = await InstagramProfile.findByPk(profileId);
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
    const profile = await YouTubeProfile.findByPk(profileId);
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
    const profile = await TikTokProfile.findByPk(profileId);
    if (!profile) {
      return res.status(404).json({ message: "TikTok profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


