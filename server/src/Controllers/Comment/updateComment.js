const Comment = require("../../Models/Comments.model");
const Task = require("../../Models/Task.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const updateComment = async (req, res) => {
  const { commentId } = req.query;
  const { content } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return failCode(res, "", "Comment not found in database");
    }

    comment.content = content;
    await comment.save();

    return successCode(res, comment, "Comment updated successfully");
  } catch (error) {
    console.error(error);
    return errorCode(res, "Backend error");
  }
};

module.exports = { updateComment };
