const { failCode, successCode, errorCode } = require('../../config/reponse');
const Comment = require('../../Models/Comments.model');
const Task = require('../../Models/Task.model');
const generateId = require('../../utils/generateId');

const createComment = async (req, res) => {
    const { taskId, contentComment } = req.body;
    const userId = req.user.id;
    const id = await generateId('idComment');
    try {
        // Check if the task exists
        const task = await Task.findOne({ id: taskId });
        if (!task) {
            return failCode(res, "", "Không tìm thấy nhiệm vụ!");
        }

        // Create the new comment object
        const newComment = {
            id,
            userId,
            contentComment,
            alias: req.user.username,
            "deleted": false,
        };

        // Add the new comment to the listComment array
        task.listComment.push(newComment);

        // Save the updated task
        await task.save();
        const result = await Comment.create({
            id,
            taskId,
            userId,
            contentComment,
            deleted: "false",
            alias: ""
        });
        
        // Chuyển đổi sang đối tượng JavaScript thuần túy
        const resultObject = result.toObject();
        
        // Loại bỏ trường `_id`
        delete resultObject._id;
        
        return successCode(res, resultObject, "Bình luận thành công!");
        

    } catch (error) {
        console.error(error); // Log the error for debugging
        return errorCode(res, "Backend error");
    }
};

module.exports = { createComment };
