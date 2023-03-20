const router = require('express').Router();

const { 
    getAllThoughts, 
    getThoughtsById, 
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtsController');

//directs to: /api/thoughts <GET>
router.route('/').get(getAllThoughts);

//directs to: /api/thoughts/:id <GET, PUT, DELETE>
router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

//directs to: /api/thoughts/:userId <POST>
router.route('/:userId').post(createThoughts);

//directs to: /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction);

//directs to: /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;