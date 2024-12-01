const mongoose = require('mongoose');
const Task = require('../../Models/Task.model');
const User = require('../../Models/User.model');
const Project = require('../../Models/Project.model');
const Status = require('../../Models/Status.model');
const TaskType = require('../../Models/TaskType.model');
const Priority = require('../../Models/Priority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const generateId = require('../../utils/generateId');

const createTask = async (req, res) => {
    const {
        listUserAssign,
        taskName,
        description,
        statusId,
        originalEstimate,
        timeTrackingSpent,
        timeTrackingRemaining,
        projectId,
        reporterId,
        typeId,
        priorityId
    } = req.body;
    const id = await generateId('taskId');
    try {
        // Validate required fields
        if (!taskName || !originalEstimate || !projectId || !typeId || !priorityId) {
            return failCode(res, "", "Missing required fields");
        }

        const duplicateTask = await Task.findOne({ taskName, projectId, statusId });
        if (duplicateTask) {
            return failCode(res, "", "A task with the same name, project, and status already exists");
        }

        // Convert user IDs to ObjectId
        const userObjectIds = listUserAssign.map(user => new mongoose.Types.ObjectId(user));

        // Fetch usernames of assigned users
        const users = await User.find({ _id: { $in: userObjectIds } });

        // Map usernames to corresponding _id values
        const userListWithUsername = users.map(user => ({
            id: user.id,
            username: user.username
        }));

        // Check if all assigned users exist
        if (users.length !== listUserAssign.length) {
            return failCode(res, "", "One or more assigned users do not exist");
        }

        // Check if status exists
        const status = await Status.findById(statusId);
        if (!status) {
            return failCode(res, "", "Status does not exist");
        }
        const statusName = status.statusName;

        // Check if project exists
        const project = await Project.findById(projectId);
        if (!project) {
            return failCode(res, "", "Project does not exist");
        }

        // Check if type exists
        const type = await TaskType.findById(typeId);
        if (!type) {
            return failCode(res, "", "Type does not exist");
        }
        const typeName = type.taskType;

        // Check if priority exists
        const priority = await Priority.findById(priorityId);
        if (!priority) {
            return failCode(res, "", "Priority does not exist");
        }
        const priorityName = priority.priority;

        // Create a new task and save it to the Task collection
        const newTask = await Task.create({
            listUserAssign: userListWithUsername,
            taskName,
            description,
            statusId: { id: statusId, statusName: statusName },
            originalEstimate,
            timeTrackingSpent,
            timeTrackingRemaining,
            projectId,
            reporterId,
            typeId: { id: typeId, taskType: typeName },
            priorityId: { id: priorityId, priority: priorityName }
        });

        // Add the new task to the appropriate listTask.listTaskDetail
        await Project.updateOne(
            { _id: projectId, 'listTask.statusId': statusId },
            { $push: { 'listTask.$.listTaskDetail': newTask } }
        );

        return successCode(res, newTask, "Task created successfully");
    } catch (error) {
        console.log(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { createTask };
