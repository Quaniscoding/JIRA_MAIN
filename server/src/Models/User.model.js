const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        unique: true,
        require:true
    },
    username: {
        type: String,
        require: true,
    },
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    pass_word: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    birth_day: {
        type: Date,
    },
    gender: {
        type: String,
    },
    role: {
        type: String,
    },
    avatar: {
        type: String,
    },
}, {
    versionKey: false
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
