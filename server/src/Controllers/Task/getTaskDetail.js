const Task = require("../../Models/Task.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const getTaskDetail = async (req, res) => {
  try {
    const { taskId, projectId } = req.query;

    let query = {};
    if (taskId) query._id = taskId;
    if (projectId) query.project = projectId;

    const tasks = await Task.find(query)
      .populate("listUserAssign", "_id username")
      .populate("status", "_id statusName")
      .populate("type", "_id name")
      .populate("priority", "_id name");

    if (!tasks || tasks.length === 0) {
      return failCode(res, "", "Task not found!");
    }

    return successCode(res, tasks, "Task(s) found!");
  } catch (error) {
    console.error("Get Task Detail Error:", error);
    return errorCode(res, "Backend error");
  }
};

module.exports = getTaskDetail;
