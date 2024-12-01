const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskTypeModelSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    taskType: {
        type: String,
    }
}, {
    versionKey: false // Disable the "__v" field
})
const TaskType = mongoose.model('taskType', TaskTypeModelSchema);
module.exports = TaskType

