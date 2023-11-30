const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const clientController = require('../controllers/client.controller');


router.route('/getClients')
    .get(asyncHandler(clientController.getClients));

router.route('/addClient')
    .post(asyncHandler(clientController.addClient));

module.exports = router;