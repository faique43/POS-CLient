const Salary = require('../Models/Salary');

exports.getSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.json(salaries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.getSalaryById = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) {
            return res.status(404).json({ msg: 'Salary not found' });
        }
        res.json(salary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.createSalary = async (req, res) => {
    const { title, amount } = req.body;
    try {
        const newSalary = new Salary({
            title,
            amount,
        });
        const salary = await newSalary.save();
        res.json(salary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.updateSalary = async (req, res) => {
    const { paid } = req.body;
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) {
            return res.status(404).json({ msg: 'Salary not found' });
        }
        salary.paid = paid;
        await salary.save();
        res.json(salary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.deleteSalary = async (req, res) => {
    try {
        const salary = await Salary.findById(req.params.id);
        if (!salary) {
            return res.status(404).json({ msg: 'Salary not found' });
        }
        await salary.remove();
        res.json({ msg: 'Salary removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
