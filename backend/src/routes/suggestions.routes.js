const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const suggestionsController = require('../controllers/suggestions.controller');


router.route('/addSuggestion')
    .post(asyncHandler(suggestionsController.addSuggestion));

router.route('/getSuggestionById/:id')
    .get(asyncHandler(suggestionsController.getSuggestionById));

router.route('/getSuggestionsByDevelopement')
    .get(asyncHandler(suggestionsController.getSuggestionsByDevelopement));

router.route('/getSuggestionsByTeam')
    .get(asyncHandler(suggestionsController.getSuggestionsByTeam));

router.route('/getSuggestionsByUserId/:id')
    .get(asyncHandler(suggestionsController.getSuggestionsByUserId));

router.route('/getSuggestionsByPriorityASC')
    .get(asyncHandler(suggestionsController.getSuggestionsByPriorityASC));

router.route('/rejectSuggestion/:id')
    .put(asyncHandler(suggestionsController.rejectSuggestion));

router.route('/approveSuggestion/:id')
    .put(asyncHandler(suggestionsController.approveSuggestion));

router.route('/updatePriorityAndDates/:id') 
    .put(asyncHandler(suggestionsController.updatePriorityAndDates));

router.route('/updateEstimatedTime/:id')
    .put(asyncHandler(suggestionsController.updateEstimatedTime));



module.exports = router;