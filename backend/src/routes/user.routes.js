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
    

module.exports = router;