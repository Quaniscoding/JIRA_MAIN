const Task = require('../../Models/Task.model');
const User = require('../../Models/User.model');
const Status = require('../../Models/Status.model');
const TaskType = require('../../Models/TaskType.model');
const Priority = require('../../Models/Priority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');
const { default: mongoose } = require('mongoose');

const updateTask = async (req, res) => {
    const taskId = req.params.id;
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

    try {
        const existingTask = await Task.findById(taskId);
        if (!existingTask) {
            return failCode(res, "", "Task not found");
        }

        if (!taskName || !originalEstimate || !projectId || !typeId || !priorityId) {
            return failCode(res, "", "Missing required fields");
        }

        const userObjectIds = listUserAssign.map(id => new mongoose.Types.ObjectId(id));
        const usersExist = await User.find({ _id: { $in: userObjectIds } });
        if (usersExist.length !== listUserAssign.length) {
            return failCode(res, "", "One or more assigned users do not exist");
        }

        if (statusId) {
            const statusExist = await Status.findById(statusId);
            if (!statusExist) {
                return failCode(res, "", "Status does not exist");
            }
        }

        if (projectId) {
            const projectExist = await Project.findById(projectId);
            if (!projectExist) {
                return failCode(res, "", "Project does not exist");
            }
        }

        if (typeId) {
            const typeExist = await TaskType.findById(typeId);
            if (!typeExist) {
                return failCode(res, "", "Type does not exist");
            }
        }

        if (priorityId) {
            const priorityExist = await Priority.findById(priorityId);
            if (!priorityExist) {
                return failCode(res, "", "Priority does not exist");
            }
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, {
            listUserAssign: userObjectIds,
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
        }, { new: true });

        const project = await Project.findById(projectId);
        if (!project) {
            return failCode(res, "", "Project not found");
        }

        for (const taskList of project.listTask) {
            const taskIndex = taskList.listTaskDetail.findIndex(task => task._id.equals(taskId));
            if (taskIndex !== -1) {
                const taskDetail = taskList.listTaskDetail[taskIndex];
                taskDetail.taskName = taskName;
                taskDetail.description = description;
                taskDetail.statusId = statusId;
                taskDetail.originalEstimate = originalEstimate;
                taskDetail.timeTrackingSpent = timeTrackingSpent;
                taskDetail.timeTrackingRemaining = timeTrackingRemaining;
                taskDetail.projectId = projectId;
                taskDetail.reporterId = reporterId;
                taskDetail.typeId = typeId;
                taskDetail.priorityId = priorityId;
                taskDetail.listUserAssign = userObjectIds;

                taskList.listTaskDetail.splice(taskIndex, 1);

                const newStatusList = project.listTask.find(list => list.statusId.equals(statusId));
                if (newStatusList) {
                    newStatusList.listTaskDetail.push(taskDetail);
                }
                break;
            }
        }

        await project.save();

        return successCode(res, updatedTask, "Task updated successfully");
    } catch (error) {
        return errorCode(res, "Backend error");
    }
};

module.exports = updateTask;
