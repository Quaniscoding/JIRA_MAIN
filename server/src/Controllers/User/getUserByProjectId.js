const Project = require('../../Models/Project.model');
const User = require('../../Models/User.model');
const { failCode, successCode } = require('../../config/reponse');

const getUserByProjectId = async (req, res) => {
    const projectId = req.params.projectId;
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return failCode(res, "", "Không tìm thấy dự án");
        }
        const userIds = project.members.map(member => member.id);
        const users = await User.find({ id: { $in: userIds } }).select('-pass_word').select('-_id');
        if (!users) {
            failCode(res, "", "Người dùng không tồn tại!")
        }
        else {
            successCode(res, users, "Lấy danh sách người dùng thành công!")
        }

    } catch (error) {
        console.log(error);
        failCode(res, "Backend error !")
    }
}
module.exports = { getUserByProjectId };