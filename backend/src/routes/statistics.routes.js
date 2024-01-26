const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const clientMetrics = require('../controllers/statistics.controller');


router.route('/getClientMetrics')
    .get(asyncHandler(clientMetrics.getClientMetrics));

router.route('/getCampaignMetrics')
    .get(asyncHandler(clientMetrics.getCampaignMetrics));

router.route('/getCampaignMetricsByClientId/:clientId')
    .get(asyncHandler(clientMetrics.getCampaignMetricsByClientId));

module.exports = router;