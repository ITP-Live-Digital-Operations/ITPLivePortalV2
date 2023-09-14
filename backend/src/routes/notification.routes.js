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
            .get(asyncHandler(NotificationController.updateNotification));

router.route('/getNotificationById/:id')    
            .get(asyncHandler(NotificationController.getNotificationById));

router.route('/getUnreadNotificationCountByUserId/:id')
            .get(asyncHandler(NotificationController.getUnreadNotificationCountByUserId));
router.route('/clearAllNotificationsById/:id')
            .get(asyncHandler(NotificationController.clearAllNotificationsById));
module.exports = router;