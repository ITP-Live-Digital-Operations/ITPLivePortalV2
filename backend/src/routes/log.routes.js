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

router.route('/deleteLog/:id')
    .delete(authHandler, asyncHandler(LogController.deleteLog));

router.route('/getLogById/:id')
    .get(authHandler, asyncHandler(LogController.getLogById));

router.route('/updateSingleLog/:id')
    .patch(authHandler, asyncHandler(LogController.updateSingleLog));

router.route('/updatePackageLog/:id')
    .patch(authHandler, asyncHandler(LogController.updatePackageLog));
module.exports = router;