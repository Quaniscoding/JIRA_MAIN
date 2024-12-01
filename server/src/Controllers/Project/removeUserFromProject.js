const { failCode, successCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');

const removeUserFromProject = async (req, res) => {
    try {
        const { projectId, userId } = req.body;

        const project = await Project.findById(projectId);

        if (!project) {
            return failCode(res, "", "Project does not exist!");
        }
        const userIndex = project.members.findIndex(member => member._id.toString() === userId);

        if (userIndex === -1) {
            return failCode(res, "", "User is not a member of this project!");
        }
        project.members.splice(userIndex, 1);

        await project.save();

        return successCode(res, "", "Remove user from Project success!");
    } catch (error) {
        return failCode(res, "Backend error!");
    }
};

module.exports = { removeUserFromProject };
