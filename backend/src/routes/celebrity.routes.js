const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const celebrityController = require('../controllers/celebrity.controller');

router.route('/createCelebrity')
    .post(asyncHandler(celebrityController.createCelebrity));

router.route('/getCelebrities')
    .get(asyncHandler(celebrityController.getCelebrities));

router.route('/deleteCelebrity/:id')
    .delete(asyncHandler(celebrityController.deleteCelebrity));

router.route('/getCelebrity/:id')
    .get(asyncHandler(celebrityController.getCelebrity));

router.route('/updateCelebrity/:id')
    .patch(asyncHandler(celebrityController.updateCelebrity));

module.exports = router;