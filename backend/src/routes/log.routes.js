const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const authHandler = require('../middlewares/authHandler');
const LogController = require('../controllers/log.controller');

router.route('/addLog')
    .post(authHandler, asyncHandler(LogController.create));

router.route('/getLogs')
    .get(authHandler, asyncHandler(LogController.getLogs));

router.route('/getInfluencerLogs/:id')
    .get(authHandler, asyncHandler(LogController.getInfluencerLogs));


module.exports = router;