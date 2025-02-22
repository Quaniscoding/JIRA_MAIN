const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RoleSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    roleName: {
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
    _id: false
})

const role = mongoose.model('role', RoleSchema);
module.exports = role

