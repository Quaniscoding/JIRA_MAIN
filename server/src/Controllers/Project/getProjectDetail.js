
const Project = require('../../Models/Project.model');

const { successCode, failCode } = require('../../config/reponse');

const getProjectDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Project.find({ id: id }).select("-_id")
        if (result == "") {
            failCode(res, "", "Dự án không tồn tại !")
        }
        else {
            successCode(res, result, "Lấy danh sách dự án thành công!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getProjectDetail }