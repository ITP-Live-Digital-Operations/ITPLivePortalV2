const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const campaignController = require('../controllers/campaign.controller');


router.route('/getCampaigns')
    .get(asyncHandler(campaignController.getCampaigns));

router.route('/getCampaignById/:id')
    .get(asyncHandler(campaignController.getCampaignById));

router.route('/addCampaign')
    .post(asyncHandler(campaignController.addCampaign));

router.route('/addInfluencersToCampaign/:id')
    .post(asyncHandler(campaignController.addInfluencersToCampaign));
module.exports = router;