const Task = require("../../Models/Task.model");
const Project = require("../../Models/Project.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return failCode(res, "", "Task ID is required!");
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return failCode(res, "", "Task not found or delete failed!");
    }

    return successCode(res, deletedTask, "Delete task successfully!");
  } catch (error) {
    console.error("Delete Task Error: ", error);
    return errorCode(res, "Internal server error");
  }
};

module.exports = deleteTask;
