const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');

const webhookController = require('../controllers/webhook.controller');

router.route('/update-webhook')
    .post(asyncHandler(webhookController.updateWebhook));

module.exports = router;
