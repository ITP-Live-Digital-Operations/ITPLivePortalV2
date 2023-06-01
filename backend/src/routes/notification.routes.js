const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const NotificationController = require('../controllers/notification.controller');


router.route('/create/:id')
            .post(asyncHandler(NotificationController.createNotification));

router.route('/getNotifications/:id')
            .get(asyncHandler(NotificationController.getNotifications));

router.route('/getUnreadNotifications/:id')
            .get(asyncHandler(NotificationController.getUnreadNotifications));

router.route('/updateNotification/:id')
            .patch(asyncHandler(NotificationController.updateNotification));




module.exports = router;