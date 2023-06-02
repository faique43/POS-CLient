const mongoose = require('mongoose');
const schema = mongoose.schema;

const ExpanseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    paid: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Expanse = mongoose.model('expanse', ExpanseSchema);