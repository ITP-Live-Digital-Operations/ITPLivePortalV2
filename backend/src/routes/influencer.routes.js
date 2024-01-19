const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const authHandler = require('../middlewares/authHandler');
const influencerController = require('../controllers/influencer.controller');


router.route('/addInfluencer')
    .post(asyncHandler(influencerController.createInfluencer));

router.route('/getInfluencers')
    .get(asyncHandler(influencerController.getInfluencers));

router.route('/deleteInfluencer/:id')
    .delete(asyncHandler(influencerController.deleteInfluencer));

router.route('/getInfluencer/:id')
    .get(asyncHandler(influencerController.getInfluencer));

router.route('/getInfluencerNameById/:id')
    .get(asyncHandler(influencerController.getInfluencerNameById));

router.route('/updateInfluencer/:id')
    .patch(asyncHandler(influencerController.updateInfluencer));

router.route('/getInfluencerNames')
    .get(asyncHandler(influencerController.getInfluencerNames));

router.route('/getInfluencerIdsandNames')
    .get(asyncHandler(influencerController.getInfluencerIdsandNames));

router.route('/createInfluencerRating')
   .post(asyncHandler(influencerController.createInfluencerRating)); 

router.route('/getAverageInfluecerRating/:id')
    .get(asyncHandler(influencerController.getAverageInfluencerRating));

router.route('/getInfluencerRatings/:id')
    .get(asyncHandler(influencerController.getInfluencerRating));

router.route('/getGenders')
    .get(asyncHandler(influencerController.getGenders));

router.route('/getVerticals')
    .get(asyncHandler(influencerController.getVerticals));

router.route('/getLocations')
    .get(asyncHandler(influencerController.getLocations));

router.route('/getNationalities')
    .get(asyncHandler(influencerController.getNationalities));

router.route('/getInfluencersWithRatings')   
    .get(asyncHandler(influencerController.getAllInfluencersWithAverageRating));

router.route('/getCities')
    .get(asyncHandler(influencerController.getCities));

router.route('/getInfluencerStatisticsById/:id')
    .get(asyncHandler(influencerController.getInfluencerStatisticsById));

router.route('/addInfluencerStats')
    .post(asyncHandler(influencerController.addInfluencerStats));
module.exports = router;