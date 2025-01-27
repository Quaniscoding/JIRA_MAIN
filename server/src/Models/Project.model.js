const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    userId: {
        type: Number,
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
    listUserAssign: [{ type: Object, ref: 'User' }],
    taskName: { type: String, required: true },
    description: { type: String },
    statusId: { type: Object, ref: 'Status' },
    originalEstimate: { type: Number, required: true },
    timeTrackingSpent: { type: Number },
    timeTrackingRemaining: { type: Number },
    projectId: { type: Number, ref: 'Project', required: true },
    reporterId: { type: Number, ref: 'User' },
    typeId: { type: Object, ref: 'TaskType' },
    priorityId: { type: Object, ref: 'Priority' },
    listComment: [CommentSchema]
}, {
    versionKey: false,
});

// Define the schema for Project
const ProjectSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true,
    },
    projectName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Number, ref: 'projectCategory',
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
        id: { type: Number, ref: 'User' },
        username: String,
    },
    members: [{
        id: { type: Number, ref: 'User' },
        username: String,
    }],
    listTask: [{
        listTaskDetail: [TaskDetailSchema],
        statusId: { type: Number, ref: 'Status' },
        statusName: String,
        alias: String,
    }],
}, {
    versionKey: false,
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
