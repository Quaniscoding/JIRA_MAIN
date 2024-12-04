const Counter = require('../models/Counter.js');

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
