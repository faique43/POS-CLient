const express = require('express');
const router = express.Router();

const PaymentController = require('../Controllers/PaymentController');

router.get('/', PaymentController.getPayments);

router.get('/:id', PaymentController.getPaymentById);

router.post('/', PaymentController.createPayment);

router.put('/:id', PaymentController.updatePayment);

router.delete('/:id', PaymentController.deletePayment);

module.exports = router;
