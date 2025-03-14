const { failCode, successCode, errorCode } = require("../../config/response");
const Comment = require("../../Models/Comments.model");
const Task = require("../../Models/Task.model");

const createComment = async (req, res) => {
  const { taskId, content, userId } = req.body;

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return failCode(res, "", "Task not found");
    }

    const newComment = new Comment({
      content,
      deleted: false,
      alias: "",
      user: userId,
      task: taskId,
    });
    const result = await newComment.save();
    return successCode(res, result, "Comment created successfully");
  } catch (error) {
    return errorCode(res, "Backend error");
  }
};

module.exports = { createComment };
