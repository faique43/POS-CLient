const express = require('express');
const router = express.Router();

const adminController = require('../Controllers/AdminController');

// @route   GET api/admins
// @desc    Get all admins
// @access  Public
router.get('/', adminController.getAdmins);

// @route   GET api/admins/:id
// @desc    Get admin by ID
// @access  Public
router.get('/:id', adminController.getAdminById);

// @route   POST api/admins
// @desc    Create an admin
// @access  Private
router.post('/', adminController.createAdmin);

// @route   POST api/admins/auth
// @desc    Authenticate an admin
// @access  Private
router.post('/auth', adminController.authenticateAdmin);

module.exports = router;