const { failCode, successCode, errorCode } = require("../../config/reponse");
const Role = require('../../Models/Role.model');

const updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const { roleName } = req.body;
        const result = await Role.findOneAndUpdate({ id: id }, { roleName }, options).select("-_id")
        if (!result) {
            failCode(res, "", "Không tìm thấy role");
            return;
        }
        else {
            successCode(res, result, "Cập nhật role thành công")
        }
    } catch (error) {
        errorCode(res, "Backend error !")
    }
}

module.exports = { updateRole }