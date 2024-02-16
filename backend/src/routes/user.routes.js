const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const userController = require('../controllers/user.controller');

router.route('/register')
    .post(asyncHandler(userController.register));

router.route('/login')
    .post(asyncHandler(userController.login)); 
       
router.route('/getAllUsers')
    .get(asyncHandler(userController.getAllUsers));

router.route('/getUser/:id')
    .get(asyncHandler(userController.getUserByID));

router.route('/getTalentUserIdNames')
    .get(asyncHandler(userController.getTalentUserIdNames));

router.route('/changePassword')
    .patch(asyncHandler(userController.changePassword));
    
router.route('/addTimeForm')
    .post(asyncHandler(userController.addTimeForm));

router.route('/getTimeFormsById/:id')
    .get(asyncHandler(userController.getTimeFormsById));

router.route('/getUserNameById/:id')
    .get(asyncHandler(userController.getUserNameById));

router.route('/updateUser/:id')
    .patch(asyncHandler(userController.updateUser));

router.route('/resetCount/:id')
    .get(asyncHandler(userController.resetCount)); 
    
router.route('/resetPassword/:id') 
    .get(asyncHandler(userController.resetPassword));

router.route('/deleteUser/:id')
    .delete(asyncHandler(userController.deleteUser));

router.route('/getTalentHeads')
    .get(asyncHandler(userController.getTalentHeads));

router.route('/getKSAHeads')
    .get(asyncHandler(userController.getKSAHeads));

router.route('/getUAEHead')
    .get(asyncHandler(userController.getUAEHead));

router.route('/addTalentHead/:id')
    .get(asyncHandler(userController.addTalentHead));

router.route('/removeTalentHead/:id')
    .get(asyncHandler(userController.removeTalentHead));

router.route('/goOnLeave/:id')
    .get(asyncHandler(userController.goOnLeave));

router.route('/returnFromLeave/:id')
    .get(asyncHandler(userController.returnFromLeave));

router.route('/uploadProfilePicture/:id')
    .post(asyncHandler(userController.uploadProfilePicture));


module.exports = router;