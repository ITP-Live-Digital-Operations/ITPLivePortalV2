const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userStatsController = require('../controllers/userStats.controller');

router.route('/countUploadedBriefsByUser')
    .get(asyncHandler(userStatsController.countUploadedBriefsByUser));

router.route('/countAddedLogsByUser')
    .get(asyncHandler(userStatsController.countAddedLogsByUser));

router.route('/countAddedInfluencersByUser')
    .get(asyncHandler(userStatsController.countAddedInfluencersByUser));

router.route('/countAddedCelebritiesByUser')
    .get(asyncHandler(userStatsController.countAddedCelebritiesByUser));

router.route('/countAddedClientsByUser')
    .get(asyncHandler(userStatsController.countAddedClientsByUser));

router.route('/countAddedFilesByUser')
    .get(asyncHandler(userStatsController.countAddedFilesByUser));

router.route('/countTalentTasks')
    .get(asyncHandler(userStatsController.countTalentTasks));

router.route('/countInfluencerRemarksByUser')
    .get(asyncHandler(userStatsController.countInfluencerRemarksByUser));

router.route('/countInfluencerCampaigns')
    .get(asyncHandler(userStatsController.countInfluencerCampaigns));
module.exports = router;