const Task = require('../../Models/Task.model');
const Project = require('../../Models/Project.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const deleteTask = async (req, res) => {
    const taskId = req.params.id; // Assuming the task id is passed as a URL parameter
    try {
        const result = await Task.findOneAndDelete({ id: taskId }).select("-_id");
        if (!result) {
            return failCode(res, "", "Không tìm thấy tác vụ!");
        }
        // Remove the task from the listTaskDetail array in the corresponding project
        if (result) {
            await Project.updateOne(
                { id: result.projectId, 'listTask.statusId': result.statusId.id },
                { $pull: { 'listTask.$.listTaskDetail': { id: taskId } } }
            );
            return successCode(res, "", "Xoá tác vụ thành công !");
        }
    } catch (error) {
        console.log(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = deleteTask;
