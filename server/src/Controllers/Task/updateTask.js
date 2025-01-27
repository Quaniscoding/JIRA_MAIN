const Task = require('../../Models/Task.model');
const User = require('../../Models/User.model');
const Status = require('../../Models/Status.model');
const TaskType = require('../../Models/TaskType.model');
const Priority = require('../../Models/Priority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');

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
        const existingTask = await Task.findOne({ id: taskId });
        if (!existingTask) {
            return failCode(res, "", "Không tìm thấy nhiệm vụ!");
        }

        let updateData = {};

        // Xử lý listUserAssign
        if (listUserAssign) {
            const listUserId = listUserAssign.map(user => user);
            const usersExist = await User.find({ id: { $in: listUserId } });
            const userListWithUsername = usersExist.map(user => ({
                id: user.id,
                username: user.username,
            }));

            if (usersExist.length !== listUserAssign.length) {
                return failCode(res, "", "One or more assigned users do not exist");
            }
            updateData.listUserAssign = userListWithUsername;
        }

        // Xử lý statusId
        if (statusId) {
            const statusExist = await Status.findOne({ id: statusId });
            if (!statusExist) {
                return failCode(res, "", "Status does not exist");
            }
            updateData.statusId = { id: statusId, statusName: statusExist.statusName };
        }
        // Xử lý typeId
        if (typeId >= 0) {
            const typeExist = await TaskType.findOne({ id: typeId });
            if (!typeExist) {
                return failCode(res, "", "Type does not exist");
            }
            updateData.typeId = { id: typeId, taskType: typeExist.taskType };
        }

        // Xử lý priorityId
        if (priorityId >= 0) {
            const priorityExist = await Priority.findOne({ id: priorityId });
            if (!priorityExist) {
                return failCode(res, "", "Priority does not exist");
            }
            updateData.priorityId = { id: priorityId, priority: priorityExist.priority };
        }

        // Xử lý các trường khác
        if (taskName) updateData.taskName = taskName;
        if (description) updateData.description = description;
        if (originalEstimate !== undefined) updateData.originalEstimate = originalEstimate;
        if (timeTrackingSpent !== undefined) updateData.timeTrackingSpent = timeTrackingSpent;
        if (timeTrackingRemaining !== undefined) updateData.timeTrackingRemaining = timeTrackingRemaining;
        if (projectId) updateData.projectId = projectId;
        if (reporterId) updateData.reporterId = reporterId;
        // Cập nhật Task
        const updatedTask = await Task.findOneAndUpdate({ id: taskId }, updateData, { new: true }).select("-_id");

        // Cập nhật thông tin task trong Project nếu cần
        if (projectId) {
            const project = await Project.findOne({ id: projectId });
            if (!project) {
                return failCode(res, "", "Project not found");
            }

            for (const taskList of project.listTask) {
                const taskIndex = taskList.listTaskDetail.findIndex(task => task.id == taskId);
                if (taskIndex !== -1) {
                    const taskDetail = taskList.listTaskDetail[taskIndex];

                    // Cập nhật thông tin
                    if (taskName) taskDetail.taskName = taskName;
                    if (description) taskDetail.description = description;
                    if (statusId) taskDetail.statusId = updateData.statusId;
                    if (originalEstimate !== undefined) taskDetail.originalEstimate = originalEstimate;
                    if (timeTrackingSpent !== undefined) taskDetail.timeTrackingSpent = timeTrackingSpent;
                    if (timeTrackingRemaining !== undefined) taskDetail.timeTrackingRemaining = timeTrackingRemaining;
                    if (listUserAssign) taskDetail.listUserAssign = updateData.listUserAssign;
                    if (typeId >= 0) taskDetail.typeId = updateData.typeId;
                    if (priorityId >= 0) taskDetail.priorityId = updateData.priorityId;
                    // Di chuyển task nếu statusId thay đổi
                    if (statusId) {
                        taskList.listTaskDetail.splice(taskIndex, 1);
                        const newStatusList = project.listTask.find(list => list.statusId === statusId);
                        if (newStatusList) {
                            newStatusList.listTaskDetail.push(taskDetail);
                        }
                    }
                    break;
                }
            }
            await project.save();
        }

        return successCode(res, updatedTask, "Nhiệm vụ được cập nhật thành công!");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};


module.exports = updateTask;
