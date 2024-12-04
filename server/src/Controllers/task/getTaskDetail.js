const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const getTaskDetail = async (req, res) => {
    const taskId = req.params.id; // Assuming the task id is passed as a URL parameter

    try {
        // Find the task by its id
        const task = await Task.findOne({id:taskId}).select("-_id");

        // Check if the task exists
        if (!task) {
            return failCode(res, "", "Không tìm thấy nhiệm vụ!");
        }

        // Return the task details
        return successCode(res, task, "Đã tìm thấy nhiệm vụ!");
    } catch (error) {
        return errorCode(res, "Backend error");
    }
};

module.exports = getTaskDetail;
