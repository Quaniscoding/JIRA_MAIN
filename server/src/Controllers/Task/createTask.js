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
    const id = await generateId('task');
    try {
        if (
            taskName === undefined ||
            originalEstimate === undefined ||
            projectId === undefined ||
            typeId === undefined ||
            priorityId === undefined ||
            statusId === undefined
        ) {
            return failCode(res, "", "Missing required fields");
        }

        const duplicateTask = await Task.findOne({ taskName, projectId, statusId });
        if (duplicateTask) {
            return failCode(res, "", "A task with the same name, project, and status already exists");
        }

        const listUserId = listUserAssign.map(user => user);

        const users = await User.find({ id: { $in: listUserId } });
        const userListWithUsername = users.map(user => ({
            id: user.id,
            username: user.username
        }));
        if (users.length !== listUserAssign.length) {
            return failCode(res, "", "One or more assigned users do not exist");
        }
        const status = await Status.findOne({ id: statusId });

        if (!status) {
            return failCode(res, "", "Status does not exist");
        }
        const statusName = status.statusName;

        const project = await Project.findOne({ id: projectId });
        if (!project) {
            return failCode(res, "", "Project does not exist");
        }

        const type = await TaskType.findOne({ id: typeId });
        if (!type) {
            return failCode(res, "", "Type does not exist");
        }
        const typeName = type.taskType;

        const priority = await Priority.findOne({ id: priorityId });
        if (!priority) {
            return failCode(res, "", "Priority does not exist");
        }
        const priorityName = priority.priority;

        const newTask = await Task.create({
            id: id,
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
        await Project.updateOne(
            { id: projectId, 'listTask.statusId': statusId },
            { $push: { 'listTask.$.listTaskDetail': newTask } }
        );
        return successCode(res, newTask, "Tác vụ được tạo thành công!");
    } catch (error) {
        console.log(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { createTask };
