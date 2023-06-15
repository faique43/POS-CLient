const express = require('express');
const router = express.Router();

const adminInventoryController = require('../Controllers/AdminInventoryController');

router.post('/', adminInventoryController.createAdminInventory);

router.post('/auth', adminInventoryController.authenticateAdminInventory);

module.exports = router;