const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const getTaskDetail = async (req, res) => {
    const taskId = req.params.id; // Assuming the task id is passed as a URL parameter

    try {
        // Find the task by its id
        const task = await Task.findById(taskId);

        // Check if the task exists
        if (!task) {
            return failCode(res, "", "Task not found");
        }

        // Return the task details
        return successCode(res, task, "Task found");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = getTaskDetail;
