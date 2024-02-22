const express = require('express');
const { getAllUsers, getUserById } = require('../controllers/userController');
const {
    addReaction,
    removeReaction
} = require('../controllers/thoughtController');
  
const router = express.Router();

// Define routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Routes for reactions
router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
