// const Counter = require('../models/Counter.js');
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

const generateId = async (name) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { name },
            { $inc: { value: 1 } },
            { new: true, upsert: true }
        );
        return counter.value;
    } catch (error) {
        throw new Error("Error generating next ID: " + error.message);
    }
};

module.exports = generateId;
