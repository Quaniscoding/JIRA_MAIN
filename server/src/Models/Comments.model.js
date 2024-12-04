const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    taskId: {
        type: Number
    },
    userId: { id: { type: Number, ref: 'User', unique: true } },
    contentComment: {
        type: String,
    },
    deleted: {
        type: String
    },
    alias: {
        type: String,
    }
}, {
    versionKey: false // Disable the "__v" field
})
const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment

