const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const celebrityController = require('../controllers/celebrity.controller');

router.route('/createCelebrity')
    .post(asyncHandler(celebrityController.createCelebrity));

router.route('/getCelebrities')
    .get(asyncHandler(celebrityController.getCelebrities));

router.route('/getCelebritiesIdsandNames')
    .get(asyncHandler(celebrityController.getCelebritiesIdsandNames));

router.route('/deleteCelebrity/:id')
    .delete(asyncHandler(celebrityController.deleteCelebrity));

router.route('/getCelebrity/:id')
    .get(asyncHandler(celebrityController.getCelebrity));

router.route('/updateCelebrity/:id')
    .patch(asyncHandler(celebrityController.updateCelebrity));
// ----------------------- Remarks 
router.route('/createCelebrityRemark')
    .post(asyncHandler(celebrityController.createCelebrityRemark));

router.route('/getCelebrityRemarkById/:id')
    .get(asyncHandler(celebrityController.getCelebrityRemarkById));

router.route('/getCelebrityRemarks/:id')
    .get(asyncHandler(celebrityController.getCelebrityRemarks));

router.route('/updateCelebrityRemark/:id')
    .patch(asyncHandler(celebrityController.updateCelebrityRemark));

router.route('/deleteCelebrityRemark/:id')
    .delete(asyncHandler(celebrityController.deleteCelebrityRemark));

module.exports = router;