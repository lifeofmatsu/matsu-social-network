const express = require('express');
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../controllers/thoughtController');
  
const router = express.Router();

// Define routes
router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:id', getThoughtById);
router.post('/thoughts', createThought);
router.put('/thoughts/:id', updateThought);
router.delete('/thoughts/:id', deleteThought);

// Routes for reactions
router.post('/thoughts/:thoughtId/reactions', addReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
