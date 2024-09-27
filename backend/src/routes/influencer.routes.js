const router = require("express").Router();
const { asyncHandler } = require("../middlewares/asyncHandler");
const influencerController = require("../controllers/influencer.controller");
const influencerV2Controller = require("../controllers/influencerAPI.controller");

router
  .route("/addInfluencer")
  .post(asyncHandler(influencerController.createInfluencer));

router
  .route("/getInfluencers")
  .get(asyncHandler(influencerController.getInfluencers));

router
  .route("/deleteInfluencer/:id")
  .delete(asyncHandler(influencerController.deleteInfluencer));

router
  .route("/getInfluencer/:id")
  .get(asyncHandler(influencerController.getInfluencer));

router
  .route("/getInfluencerNameById/:id")
  .get(asyncHandler(influencerController.getInfluencerNameById));

router
  .route("/updateInfluencer/:id")
  .patch(asyncHandler(influencerController.updateInfluencer));

router
  .route("/getInfluencerNames")
  .get(asyncHandler(influencerController.getInfluencerNames));

router
  .route("/getInfluencerIdsandNames")
  .get(asyncHandler(influencerController.getInfluencerIdsandNames));

router
  .route("/createInfluencerRating")
  .post(asyncHandler(influencerController.createInfluencerRating));

router
  .route("/getAverageInfluecerRating/:id")
  .get(asyncHandler(influencerController.getAverageInfluencerRating));

router
  .route("/getInfluencerRatings/:id")
  .get(asyncHandler(influencerController.getInfluencerRating));

router.route("/getGenders").get(asyncHandler(influencerController.getGenders));

router
  .route("/getVerticals")
  .get(asyncHandler(influencerController.getVerticals));

router
  .route("/getLocations")
  .get(asyncHandler(influencerController.getLocations));

router
  .route("/getNationalities")
  .get(asyncHandler(influencerController.getNationalities));

router
  .route("/getInfluencersWithRatings")
  .get(asyncHandler(influencerController.getAllInfluencersWithAverageRating));

router.route("/getCities").get(asyncHandler(influencerController.getCities));

router
  .route("/getInfluencerStatisticsById/:id")
  .get(asyncHandler(influencerController.getInfluencerStatisticsById));

router
  .route("/addInfluencerStats")
  .post(asyncHandler(influencerController.addInfluencerStats));

router
  .route("/createInfluencerRemark")
  .post(asyncHandler(influencerController.createInfluencerRemark));

router
  .route("/getInfluencerRemarkById/:id")
  .get(asyncHandler(influencerController.getInfluencerRemarkById));

router
  .route("/getInfluencerRemarks/:id")
  .get(asyncHandler(influencerController.getInfluencerRemarks));

router
  .route("/updateInfluencerRemark/:id")
  .patch(asyncHandler(influencerController.updateInfluencerRemark));

router
  .route("/deleteInfluencerRemark/:id")
  .delete(asyncHandler(influencerController.deleteInfluencerRemark));

router
  .route("/getInfluencerProfileV2/:id")
  .get(asyncHandler(influencerV2Controller.getInfluencerProfileV2));

router
  .route("/updateInfluencerProfileV2/:id")
  .get(asyncHandler(influencerV2Controller.updateInfluencerProfileV2));

router
  .route("/getInstagramProfile/:id")
  .get(asyncHandler(influencerV2Controller.getInstagramProfile));

router
  .route("/getYouTubeProfile/:id")
  .get(asyncHandler(influencerV2Controller.getYouTubeProfile));

router
  .route("/getTikTokProfile/:id")
  .get(asyncHandler(influencerV2Controller.getTikTokProfile));

router
  .route("/getModashProfile/:id")
  .get(asyncHandler(influencerV2Controller.getModashProfile));

router
  .route("/getModashProfiles")
  .post(asyncHandler(influencerV2Controller.getModashProfiles));

router
  .route("/getInfluencersSearchProfiles")
  .get(asyncHandler(influencerController.getInfluencersSearchProfiles));

module.exports = router;
