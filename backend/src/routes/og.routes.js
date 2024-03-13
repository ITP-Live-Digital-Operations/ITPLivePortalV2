const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const authHandler = require('../middlewares/authHandler');
const OGController = require('../controllers/og.controller');


router.route('/getOgShows')
    .get(authHandler, asyncHandler(OGController.getOgShows));

router.route('/getOgShowById/:id')
    .get(authHandler, asyncHandler(OGController.getOgShowById));

router.route('/editShowById/:id')
    .patch(authHandler, asyncHandler(OGController.editShowById));

router.route('/addOgShow')
    .post(authHandler, asyncHandler(OGController.addOgShow));

router.route('/getOgBookings')
    .get(authHandler, asyncHandler(OGController.getOgBookings));

router.route('/getOgBookingById/:id')
    .get(authHandler, asyncHandler(OGController.getOgBookingById));

router.route('/createOgBooking')
    .post(authHandler, asyncHandler(OGController.createOgBooking));

router.route('/editOgBookingById/:id')
    .patch(authHandler, asyncHandler(OGController.editOgBookingById));

router.route('/getOgBookingByTeam/:team')
    .get(authHandler, asyncHandler(OGController.getOgBookingByTeam));
    
router.route('/createOgBookingForm')
    .post(authHandler, asyncHandler(OGController.createOgBookingForm));

router.route('/editOgBookingFormById/:id')
    .patch(authHandler, asyncHandler(OGController.editOgBookingFormById));    

router.route('/getOgBookingProductionFormById/:id')
    .get(authHandler, asyncHandler(OGController.getOgBookingProductionFormById));

router.route('/getOgBookingEditorFormById/:id')
    .get(authHandler, asyncHandler(OGController.getOgBookingEditorFormById));

router.route('/getOgBookingGraphicsFormById/:id')
    .get(authHandler, asyncHandler(OGController.getOgBookingGraphicsFormById));

router.route('/getBookingProductonFormByBookingId/:id')
    .get(authHandler, asyncHandler(OGController.getBookingProductonFormByBookingId));

router.route('/getBookingEditorFormByBookingId/:id')
    .get(authHandler, asyncHandler(OGController.getBookingEditorFormByBookingId));

router.route('/getBookingGraphicsFormByBookingId/:id')
    .get(authHandler, asyncHandler(OGController.getBookingGraphicsFormByBookingId));
    
router.route('/addProductionTeamMembersToBooking')
    .post(authHandler, asyncHandler(OGController.addProductionTeamMembersToBooking));

router.route('/updateProductionTeamMembersToBooking')
    .post(authHandler, asyncHandler(OGController.updateProductionTeamMembersToBooking));

router.route('/getProductionTeamMembersByBookingId/:id')
    .get(authHandler, asyncHandler(OGController.getProductionTeamMembersByBookingId));

module.exports = router;
