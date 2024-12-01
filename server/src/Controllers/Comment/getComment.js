const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const getComment = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await Task.findById(taskId)

        if (!task) {
            return failCode(res, "", "Task not found");
        }

        const result = task.listComment;

        return successCode(res, result, "Comments retrieved successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { getComment };
