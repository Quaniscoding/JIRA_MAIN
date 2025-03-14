const Task = require("../../Models/Task.model");

const { failCode, successCode, errorCode } = require("../../config/response");

const createTask = async (req, res) => {
  try {
    const {
      taskName,
      description,
      originalEstimate,
      timeTrackingSpent,
      timeTrackingRemaining,
      reporter,
      project,
      status,
      type,
      priority,
      listUserAssign,
    } = req.body;

    if (!taskName || !status || !project) {
      return res.status(400).json({
        message:
          "Missing required fields: taskName, originalEstimate, project are required!",
      });
    }

    const newTask = new Task({
      taskName,
      description,
      originalEstimate,
      timeTrackingSpent,
      timeTrackingRemaining,
      reporter,
      project,
      status,
      type,
      priority,
      listUserAssign,
    });

    // Lưu task vào database
    const savedTask = await newTask.save();

    if (!savedTask) {
      return failCode(res, "", "Create task failed!");
    }

    return successCode(res, savedTask, "Create task successfully!");
  } catch (error) {
    console.error("Create Task Error: ", error);
    return errorCode(res, "Internal server error");
  }
};

module.exports = { createTask };
