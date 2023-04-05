const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const TaskController = require('../controllers/task.controller');

router.route('/createTask')
    .post(asyncHandler(TaskController.create));

router.route('/getUnfinishedTasks/:id')
    .get(asyncHandler(TaskController.getUnfinishedTasks));

router.route('/getMyTasks/:id')
    .get(asyncHandler(TaskController.getUserTasks));

router.route('/updateStatus')
    .post(asyncHandler(TaskController.updateStatus));

router.route('/updateStatusToComplete')
    .post(asyncHandler(TaskController.updateStatusToComplete));

module.exports = router;