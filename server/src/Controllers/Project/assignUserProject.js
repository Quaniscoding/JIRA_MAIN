const { failCode, successCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');
const User = require('../../Models/User.model');

const assignUserProject = async (req, res) => {
    try {
        const { projectId, userId } = req.body;

        // Find user details
        const userDetail = await User.find({ id: userId });
        if (!userDetail) {
            return failCode(res, "", "Người dùng không tồn tại!");
        }

        // return
        // Find project and add user if not already a member
        const result = await Project.findOneAndUpdate(
            { id: projectId },
            {
                $addToSet: { members: userDetail }
            },
            { new: true }
        );
        if (!result) {
            return failCode(res, "", "Dự án không tồn tại!");
        } else {
            return successCode(res, "", "Thêm người dùng vào dự án thành công!");
        }
    } catch (error) {
        return failCode(res, "Backend error!");
    }
};

module.exports = { assignUserProject };
