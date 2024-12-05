const { failCode, successCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');

const removeUserFromProject = async (req, res) => {
    try {
        const { projectId, userId } = req.body;

        const project = await Project.findOne({id:projectId});
        if (!project) {
            return failCode(res, "", "Project does not exist!");
        }
        const userIndex = project.members.findIndex(member => member.id == userId);

        if (userIndex === -1) {
            return failCode(res, "", "Người dùng không phải là thành viên của dự án này!");
        }
        project.members.splice(userIndex, 1);

        await project.save();

        return successCode(res, "", "Xoá người dùng khỏi dự án thành công!");
    } catch (error) {
        return failCode(res, "Backend error!");
    }
};

module.exports = { removeUserFromProject };
