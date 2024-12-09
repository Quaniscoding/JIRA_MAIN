const { successCode, failCode, errorCode } = require("../../config/reponse");
const Project = require('../../Models/Project.model')
const deleteProject = async (req, res) => {
    const id = req.params.id;
    const creatorId = req.user.id;
    try {
        const result = await Project.deleteOne({ id: id })
        if (!result) {
            failCode(res, "", 'Dự án không tồn tại !');
        }
        else {
            const responseData = {
                deletedProjectId: id,
                creator: creatorId
            };
            delete responseData.listTask;
            successCode(res, responseData, "Xóa dự án thành công!");
        }
    } catch (error) {
        errorCode(res, "Backend error !");
    }
};
module.exports = {
    deleteProject,
};
