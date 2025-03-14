const Comment = require("../../Models/Comments.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const deleteComment = async (req, res) => {
  const { commentId } = req.query;
  try {
    const result = await Comment.findByIdAndDelete(commentId);
    if (!result) {
      return failCode(res, "", "Comment not found");
    }
    return successCode(res, result, "Comment deleted successfully");
  } catch (error) {
    console.error(error);
    return errorCode(res, "Backend error");
  }
};

module.exports = { deleteComment };
