const express = require('express');
const router = express.Router();

const ExpanseController = require('../Controllers/ExpanseController');

router.get('/', ExpanseController.getExpanses);

router.get('/:id', ExpanseController.getExpanseById);

router.post('/', ExpanseController.createExpanse);

router.put('/:id', ExpanseController.updateExpanse);

router.delete('/:id', ExpanseController.deleteExpanse);

module.exports = router;