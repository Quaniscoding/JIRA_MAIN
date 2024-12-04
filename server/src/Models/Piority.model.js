const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PioritySchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    piority: {
        type: String,
    },
    description: {
        type: String
    },
    deleted: {
        type: String,
    },
    alias: {
        type: String
    }
}, {
    versionKey: false // Disable the "__v" field
})
const Piority = mongoose.model('Piority', PioritySchema);
module.exports = Piority

