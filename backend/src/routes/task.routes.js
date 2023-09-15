const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const TaskController = require('../controllers/task.controller');

router.route('/createTask')
    .post(asyncHandler(TaskController.create));

router.route('/addUserToTask')
    .post(asyncHandler(TaskController.addUserToTask));

router.route('/getUnfinishedTasks/:id')
    .get(asyncHandler(TaskController.getUnfinishedTasks));

router.route('/getMyTasks/:id')
    .get(asyncHandler(TaskController.getUserTasks));

router.route('/updateStatus')
    .post(asyncHandler(TaskController.updateStatus));

router.route('/updateStatusToComplete')
    .post(asyncHandler(TaskController.updateStatusToComplete));

router.route('/getUsersAndTaskWeights')
    .get(asyncHandler(TaskController.getUsersAndTaskWeights));

router.route('/getTaskByBriefId/:id')
    .get(asyncHandler(TaskController.getTaskByBriefId));

router.route('/deactivateTask/:id')
    .get(asyncHandler(TaskController.deactivateTask));

router.route('/activateTask/:id')
    .get(asyncHandler(TaskController.activateTask));

router.route('/updateProgress/:id')
    .post(asyncHandler(TaskController.updateProgress));

router.route('/updateUsersToTask/:id')
    .post(asyncHandler(TaskController.updateUsersToTask));

router.route('/updateTask/:id')
    .post(asyncHandler(TaskController.updateTask));

module.exports = router; 