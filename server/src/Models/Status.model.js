const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const StatusSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    statusName: {
        type: String,
        required: true,
    },
    deleted: {
        type: String,
    },
    alias: {
        type: String
    }
}, {
    versionKey: false,
    _id:false
})

const Status = mongoose.model('Status', StatusSchema);
module.exports = Status

