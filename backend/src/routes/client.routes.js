const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const clientController = require('../controllers/client.controller');


router.route('/getClients')
    .get(asyncHandler(clientController.getClients));

router.route('/addClient')
    .post(asyncHandler(clientController.addClient));

router.route('/getClientById/:id')
    .get(asyncHandler(clientController.getClientById));

router.route('/updateClient/:id')
    .put(asyncHandler(clientController.updateClient));

router.route('/addBrandToClient/:id')
    .post(asyncHandler(clientController.addBrandToClient));
module.exports = router;