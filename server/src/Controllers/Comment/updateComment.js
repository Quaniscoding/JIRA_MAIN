const Comment = require('../../Models/Comments.model');
const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const updateComment = async (req, res) => {
    const { commentId } = req.params; // Lấy commentId từ params
    const { taskId, contentComment } = req.body;

    try {
        // Kiểm tra nhiệm vụ có tồn tại hay không
        const task = await Task.findOne({ id: taskId });
        if (!task) {
            return failCode(res, "", "Task not found");
        }

        // Kiểm tra và cập nhật trong collection Comment
        const comment = await Comment.findOneAndUpdate(
            { id: commentId },
            { contentComment },
            { new: true } // Trả về tài liệu đã được cập nhật
        );

        if (!comment) {
            return failCode(res, "", "Comment not found in database");
        }

        // Tìm và cập nhật comment trong listComment của Task
        const commentIndex = task.listComment.findIndex(c => c.id == commentId);
        if (commentIndex === -1) {
            return failCode(res, "", "Comment not found in task");
        }

        // Cập nhật nội dung comment trong listComment
        task.listComment[commentIndex].contentComment = contentComment;
        await task.save();
        const resultObject = comment.toObject();

        // Loại bỏ trường `_id`
        delete resultObject._id;
        return successCode(res, resultObject, "Cập nhật bình luận thành công!");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};


module.exports = { updateComment };
