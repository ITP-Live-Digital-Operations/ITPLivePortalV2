const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const salesBriefController = require('../controllers/salesBrief.controller');

router.route('/createSalesBrief')
    .post(asyncHandler(salesBriefController.create));

router.route('/getSalesBriefsNotViewedByTalent')
    .get(asyncHandler(salesBriefController.getBirefsNotViewedByTalent));

router.route('/getAllSalesBriefs')
    .get(asyncHandler(salesBriefController.getAllBriefs));

router.route('/viewedByTalent/:id')
    .get(asyncHandler(salesBriefController.ViewedByTalent))

router.route('/getSalesBrief/:id')
    .get(asyncHandler(salesBriefController.getSalesBrief))

router.route('/getSalesBriefIdbyTaskId/:id')
    .get(asyncHandler(salesBriefController.getSalesBriefIdByTaskId))


module.exports = router;