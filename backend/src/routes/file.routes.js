const router = require('express').Router();

const fileController = require('../controllers/file.controller');
const {asyncHandler} = require('../middlewares/asyncHandler');

router.route('/download/:id')
       .get(asyncHandler(fileController.downloadFile));
       
router.route('/upload') 
       .post(asyncHandler(fileController.uploadFile));

router.route('/getFileById/:id')
       .get(asyncHandler(fileController.getFileById)); 
             
router.route('/approveFile/:id')
       .get(asyncHandler(fileController.approveFile));

router.route('/addNotes/:id')
       .post(asyncHandler(fileController.addNotes));

router.route('/sendFile/:id')
      .get(asyncHandler(fileController.sendFile));

router.route('/uploadTable')
       .post(asyncHandler(fileController.uploadTable), asyncHandler(fileController.uploadFile));

router.route('/deleteBudgetSheetFile/:id')
       .get(asyncHandler(fileController.deleteBudgetSheetFile));

router.route('/deletePresentationFile/:id')
       .get(asyncHandler(fileController.deletePresentationFile));

module.exports = router;