const router = require('express').Router();

const fileController = require('../controllers/file.controller');
const {asyncHandler} = require('../middlewares/asyncHandler');

router.route('/download/:id')
       .get(asyncHandler(fileController.downloadFile));
       
router.route('/upload') 
       .post(asyncHandler(fileController.uploadFile));

       


module.exports = router;