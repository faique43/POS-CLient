const express = require('express');
const router = express.Router();

const userController = require('../Controllers/UserController');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', userController.getUsers);

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Public
router.get('/:id', userController.getUserById);

// @route   POST api/users
// @desc    Create a user
// @access  Private
router.post('/', userController.createUser);

// @route   POST api/users/auth
// @desc    Authenticate a user
// @access  Private
router.post('/auth', userController.authenticateUser);

module.exports = router;