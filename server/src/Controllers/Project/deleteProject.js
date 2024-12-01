const { successCode, failCode, errorCode } = require("../../config/reponse");
const Project = require('../../Models/Project.model')
const deleteProject = async (req, res) => {
    const id = req.params.id;
    const creatorId = req.user._id;
    try {
        const result = await Project.findByIdAndDelete(id)
        if (!result) {
            failCode(res, "", 'Project does not exist.');
        }

        else {
            const responseData = {
                ...result.toObject(),
                creator: creatorId
            };
            delete responseData.listTask;
            successCode(res, responseData, "Delete Project success!");
        }
    } catch (error) {
        errorCode(res, "Backend error !");
    }
};
module.exports = {
    deleteProject,
};
