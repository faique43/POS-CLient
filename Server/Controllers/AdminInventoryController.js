const AdminInventory = require('../Models/AdminInventory');

exports.createAdminInventory = async (req, res) => {
    const {username, password} = req.body;
    try {
        const newAdminInventory = new AdminInventory({
            username,
            password,
        });
        const adminInventory = await newAdminInventory.save();
        res.json(adminInventory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

exports.authenticateAdminInventory = async (req, res) => {
    const {username, password} = req.body;
    try {
        const adminInventory = await AdminInventory.findOne({username});
        if (!adminInventory) {
            return res.status(404).json({msg: 'Admin not found'});
        }
        if (adminInventory.password !== password) {
            return res.status(401).json({msg: 'Incorrect password'});
        }
        res.json(adminInventory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}