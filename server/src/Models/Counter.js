const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CounterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        required: true,
    }
});

const Counter = mongoose.model('counter', CounterSchema);
module.exports = Counter;
