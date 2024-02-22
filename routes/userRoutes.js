const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById /* other controllers */ } = require('../controllers/userController');

// Define routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
// Other route methods

module.exports = router;
