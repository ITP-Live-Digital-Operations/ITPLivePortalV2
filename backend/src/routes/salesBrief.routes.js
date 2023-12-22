const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const salesBriefController = require('../controllers/salesBrief.controller');

router.route('/createSalesBrief')
    .post(asyncHandler(salesBriefController.create));

router.route('/getSalesBriefsNotViewedByTalent')
    .get(asyncHandler(salesBriefController.getBirefsNotViewedByTalent));

router.route('/getAllSalesBriefs')
    .get(asyncHandler(salesBriefController.getAllBriefs));

router.route('/getAllAssignedBriefs')
    .get(asyncHandler(salesBriefController.getAllAssignedBriefs));

router.route('/viewedByTalent/:id')
    .get(asyncHandler(salesBriefController.ViewedByTalent))

router.route('/getSalesBrief/:id')
    .get(asyncHandler(salesBriefController.getSalesBrief))

router.route('/getSalesBriefIdbyTaskId/:id')
    .get(asyncHandler(salesBriefController.getSalesBriefIdByTaskId))

router.route('/getSalesBriefWithFiles/:id')
    .get(asyncHandler(salesBriefController.getSalesBriefWithFiles))

router.route('/updateAssignedStatus/:id')
    .get(asyncHandler(salesBriefController.updateAssignedStatus))

router.route('/updateStatus/:id')
    .get(asyncHandler(salesBriefController.updateStatus))

router.route('/salesBriefReady/:id')
    .get(asyncHandler(salesBriefController.salesBriefReady))

router.route('/getBriefByCreatedbyId/:id')
    .get(asyncHandler(salesBriefController.getBriefByCreatedbyId))

router.route('/changeStatus/:id')
    .post(asyncHandler(salesBriefController.changeStatus))

router.route('/getUserReadyBriefs/:id')
    .get(asyncHandler(salesBriefController.getUserReadyBriefs))

router.route('/viewBriefBySales/:id')
    .get(asyncHandler(salesBriefController.viewBriefBySales))

router.route('/viewMyBriefs/:id')
    .get(asyncHandler(salesBriefController.viewMyBriefs))

router.route('/updateBrief/:id')
    .patch(asyncHandler(salesBriefController.updateBrief))

router.route('/getAllActiveBriefs')
    .get(asyncHandler(salesBriefController.getAllActiveBriefs))

router.route('/setPriority/:id')
    .patch(asyncHandler(salesBriefController.setPriority))
    
router.route('/updatePriorities')
    .patch(asyncHandler(salesBriefController.updatePriorities))

router.route('/getAllBriefsWithTask')
    .get(asyncHandler(salesBriefController.getAllBriefsWithTask))

router.route('/deleteBrief/:id')
    .delete(asyncHandler(salesBriefController.deleteBrief))

router.route('/signedOffByClient/:id')
    .get(asyncHandler(salesBriefController.signedOffByClient))
module.exports = router;