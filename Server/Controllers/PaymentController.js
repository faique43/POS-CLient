const Payment = require('../Models/Payment');

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.createPayment = async (req, res) => {
    const { vendor, amount } = req.body;
    try {
        const newPayment = new Payment({
            vendor,
            amount,
        });
        const payment = await newPayment.save();
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.updatePayment = async (req, res) => {
    const { paid } = req.body;
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        payment.paid = paid;
        await payment.save();
        res.json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.deletePayment = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ msg: 'Payment not found' });
        }
        await payment.remove();
        res.json({ msg: 'Payment removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}