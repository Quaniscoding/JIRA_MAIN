const Comment = require("../../Models/Comments.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const getComment = async (req, res) => {
  const { taskId } = req.query;

  if (!taskId) {
    return errorCode(res, "Task ID is required");
  }

  try {
    const rs = await Comment.find({ task: taskId })
      .populate("user", "username _id")
      .populate("task", "taskName _id");
    return successCode(res, rs, "Get comment successfully");
  } catch (error) {
    console.error("Error fetching comments:", error);
    return errorCode(res, "Backend error");
  }
};

module.exports = { getComment };
