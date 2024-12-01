const Task = require('../../Models/Task.model');
const Project = require('../../Models/Project.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const deleteTask = async (req, res) => {
    const taskId = req.params.id; // Assuming the task id is passed as a URL parameter

    try {
        // Find the task by its id
        const task = await Task.findById(taskId);

        // Check if the task exists
        if (!task) {
            return failCode(res, "", "Task not found");
        }

        // Delete the task
        await Task.findByIdAndDelete(taskId);

        // Remove the task from the listTaskDetail array in the corresponding project
        await Project.updateOne(
            { _id: task.projectId, 'listTask.statusId': task.statusId },
            { $pull: { 'listTask.$.listTaskDetail': { _id: taskId } } }
        );

        // Return a success response indicating that the task was deleted
        return successCode(res, "", "Task deleted successfully");
    } catch (error) {
        console.log(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = deleteTask;
