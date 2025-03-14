const Task = require("../../Models/Task.model");

const { failCode, successCode, errorCode } = require("../../config/response");

const updateTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    const {
      taskName,
      description,
      status,
      originalEstimate,
      timeTrackingSpent,
      timeTrackingRemaining,
      project,
      reporter,
      type,
      priority,
      listUserAssign,
    } = req.body;

    if (!taskId) {
      return failCode(res, "", "Task ID is required!");
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          taskName,
          description,
          status,
          originalEstimate,
          timeTrackingSpent,
          timeTrackingRemaining,
          project,
          reporter,
          type,
          priority,
          listUserAssign,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return failCode(res, "", "Task not found or update failed!");
    }

    return successCode(res, updatedTask, "Update task successfully!");
  } catch (error) {
    console.error("Update Task Error: ", error);
    return errorCode(res, "Internal server error");
  }
};

module.exports = updateTask;
