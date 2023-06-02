const Expanse = require('../Models/Expanse');

// @route GET api/expanse
// @desc Get all expanses
// @access Public
exports.getExpanses = async (req, res) => {
    try {
        const expanses = await Expanse.find();
        res.json(expanses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    }

// @route GET api/expanse/:id
// @desc Get expanse by ID
// @access Public

exports.getExpanseById = async (req, res) => {
    try {
        const expanse = await Expanse.findById(req.params.id);
        if (!expanse) {
            return res.status(404).json({ msg: 'Expanse not found' });
        }
        res.json(expanse);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route POST api/expanse
// @desc Create an expanse
// @access Private
exports.createExpanse = async (req, res) => {
    const { title, amount } = req.body;
    try {
        const newExpanse = new Expanse({
            title,
            amount,
        });
        const expanse = await newExpanse.save();
        res.json(expanse);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route PUT api/expanse/:id
// @desc Update expanse by ID
// @access Private
exports.updateExpanse = async (req, res) => {
    const { paid } = req.body;
    try {
        const expanse = await Expanse.findById(req.params.id);
        if (!expanse) {
            return res.status(404).json({ msg: 'Expanse not found' });
        }
        expanse.paid = paid;
        await expanse.save();
        res.json(expanse);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// @route DELETE api/expanse/:id
// @desc Delete expanse by ID
// @access Private
exports.deleteExpanse = async (req, res) => {
    try {
        const expanse = await Expanse.findById(req.params.id);
        if (!expanse) {
            return res.status(404).json({ msg: 'Expanse not found' });
        }
        await expanse.remove();
        res.json({ msg: 'Expanse removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

