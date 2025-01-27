const { failCode, successCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const { projectName, description, categoryId, alias } = req.body;
        const result = await Project.findOneAndUpdate({ id: id }, { projectName, description, categoryId, alias }, options).select("-_id")
        if (!result) {
            failCode(res, "", "Dự án không tồn tại !");
            return;
        }
        else {
            successCode(res, result, "Cập nhật dự án thành công !")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { updateProject }