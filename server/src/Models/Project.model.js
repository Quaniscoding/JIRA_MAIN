const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentComment: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    alias: {
        type: String
    }
});

// Define the schema for TaskDetail
const TaskDetailSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    listUserAssign: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    taskName: { type: String, required: true },
    description: { type: String },
    statusId: { type: Schema.Types.ObjectId, ref: 'Status' },
    originalEstimate: { type: Number, required: true },
    timeTrackingSpent: { type: Number },
    timeTrackingRemaining: { type: Number },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    reporterId: { type: Schema.Types.ObjectId, ref: 'User' },
    typeId: { type: Schema.Types.ObjectId, ref: 'TaskType' },
    priorityId: { type: Schema.Types.ObjectId, ref: 'Priority' },
    listComment: [CommentSchema]
}, {
    versionKey: false,
});

// Define the schema for Project
const ProjectSchema = new Schema({
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId, ref: 'projectCategory',
        required: true,
    },
    alias: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false
    },
    creator: {
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        username: String,
    },
    members: [{
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        name: String,
        avatar: String,
        email: String,
        phoneNumber: String,
    }],
    listTask: [{
        listTaskDetail: [TaskDetailSchema],
        statusId: { type: Schema.Types.ObjectId, ref: 'Status' },
        statusName: String,
        alias: String,
    }],
}, {
    versionKey: false,
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
