const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userStatsController = require('../controllers/userStats.controller');

router.route('/countUploadedBriefsByUser')
    .get(asyncHandler(userStatsController.countUploadedBriefsByUser));

router.route('/countAddedLogsByUser')
    .get(asyncHandler(userStatsController.countAddedLogsByUser));

module.exports = router;