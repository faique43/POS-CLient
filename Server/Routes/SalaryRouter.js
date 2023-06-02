const express = require('express');
const router = express.Router();

const SalaryController = require('../Controllers/SalaryController');

router.get('/', SalaryController.getSalaries);

router.get('/:id', SalaryController.getSalaryById);

router.post('/', SalaryController.createSalary);

router.put('/:id', SalaryController.updateSalary);

router.delete('/:id', SalaryController.deleteSalary);

module.exports = router;