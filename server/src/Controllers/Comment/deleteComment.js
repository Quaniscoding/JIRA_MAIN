const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const deleteComment = async (req, res) => {
    const commentId = req.params.id;

    try {
        // Find the task that contains the comment
        const task = await Task.findOneAndDelete({ commentId });

        if (!task) {
            return failCode(res, "", "Không tìm thấy bình luận!");
        }

        // Remove the comment from the task
        const commentIndex = task.listComment.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return failCode(res, "", "Không tìm thấy bình luận!");
        }

        task.listComment.splice(commentIndex, 1);  // Remove the comment at the found index
        await task.save();

        return successCode(res, commentId, "Xoá bình luận thành công");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { deleteComment };
