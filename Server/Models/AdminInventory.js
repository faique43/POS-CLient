const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminInventorySchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = AdminInventory = mongoose.model('adminInventory', AdminInventorySchema);