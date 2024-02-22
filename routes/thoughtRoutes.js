const express = require('express');
const { getAllUsers, getUserById /* other controllers */ } = require('../controllers/userController');
const {
    // ... other imports ...
    addReaction,
    removeReaction
} = require('../controllers/thoughtController');
  
const router = express.Router();

// Define routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
// Other route methods

// Routes for reactions
router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
