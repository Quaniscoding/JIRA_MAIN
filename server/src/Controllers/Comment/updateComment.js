const Task = require('../../Models/Task.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const updateComment = async (req, res) => {
    const { taskId } = req.params;
    const { commentId, contentComment } = req.body;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return failCode(res, "", "Task not found");
        }

        const result = task.listComment.id(commentId);
        if (!result) {
            return failCode(res, "", "Comment not found");
        }

        result.contentComment = contentComment;
        await task.save();

        return successCode(res, "", "Comment updated successfully");
    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { updateComment };
