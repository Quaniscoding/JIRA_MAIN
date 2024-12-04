const Task = require('../../Models/Task.model');
const User = require('../../Models/User.model');
const Status = require('../../Models/Status.model');
const TaskType = require('../../Models/TaskType.model');
const Piority = require('../../Models/Piority.model');
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
        piorityId
    } = req.body;

    try {
        const existingTask = await Task.findOne({ id: taskId });
        if (!existingTask) {
            return failCode(res, "", "Không tìm thấy nhiệm vụ!");
        }

        if (!taskName || !originalEstimate || !projectId || !typeId || !piorityId) {
            return failCode(res, "", "Missing required fields");
        }

        const listUserId = listUserAssign.map(user => user);

        const usersExist = await User.find({ id: { $in: listUserId } });
        const userListWithUsername = usersExist.map(user => ({
            id: user.id,
            username: user.username
        }));

        if (usersExist.length !== listUserAssign.length) {
            return failCode(res, "", "One or more assigned users do not exist");
        }

        if (statusId) {
            const statusExist = await Status.findOne({ id: statusId });
            if (!statusExist) {
                return failCode(res, "", "Status does not exist");
            }
        }

        if (projectId) {
            const projectExist = await Project.findOne({ id: projectId });
            if (!projectExist) {
                return failCode(res, "", "Project does not exist");
            }
        }

        if (typeId) {
            const typeExist = await TaskType.findOne({ id: typeId });
            if (!typeExist) {
                return failCode(res, "", "Type does not exist");
            }
        }

        if (piorityId) {
            const piorityExist = await Piority.findOne({ id: piorityId });
            if (!piorityExist) {
                return failCode(res, "", "Piority does not exist");
            }
        }

        const updatedTask = await Task.findOneAndUpdate({ id: taskId }, {
            listUserAssign: userListWithUsername,
            taskName,
            description,
            statusId,
            originalEstimate,
            timeTrackingSpent,
            timeTrackingRemaining,
            projectId,
            reporterId,
            typeId,
            piorityId
        }, { new: true });

        const project = await Project.findOne({ id: projectId });
        if (!project) {
            return failCode(res, "", "Project not found");
        }

        for (const taskList of project.listTask) {
            const taskIndex = taskList.listTaskDetail.findIndex(task => task.id==taskId);
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
                taskDetail.piorityId = piorityId;
                taskDetail.listUserAssign = userListWithUsername;
        
                // Xóa task khỏi danh sách hiện tại
                taskList.listTaskDetail.splice(taskIndex, 1);
        
                // Thêm task vào danh sách theo statusId mới
                const newStatusList = project.listTask.find(list => list.statusId === statusId);
                if (newStatusList) {
                    newStatusList.listTaskDetail.push(taskDetail);
                }
                break;
            }
        }
        
        await project.save();

        return successCode(res, updatedTask, "Nhiệm vụ được cập nhật thành công!");
    } catch (error) {
        console.log(error);

        return errorCode(res, "Backend error");
    }
};

module.exports = updateTask;
