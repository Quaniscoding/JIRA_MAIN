const { failCode, successCode, errorCode } = require("../../config/reponse");
const Role = require('../../Models/Role.model');

const deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Role.deleteOne({ id: id });
        if (!result) {
            failCode(res, "", "Role not found!");
        }
        else {
            successCode(res, result, "Delete role successfully!");
        }
    } catch (error) {
        errorCode(res, "Backend error!");
    }
}

module.exports = { deleteRole }