const { failCode, successCode, errorCode } = require("../../config/reponse");
const Role = require('../../Models/Role.model');
const generateId = require('../../utils/generateId');

const createRole = async (req, res) => {
    try {
        const id = await generateId('roleId');
        const { roleName } = req.body;

        const existingRole = await Role.findOne({ roleName });
        if (existingRole) {
            return failCode(res, "", "Role name already exists!");
        }

        const result = await Role.create({ id, roleName });
        if (!result) {
            return failCode(res, "", "Create fail!");
        }

        return successCode(res, result, "Create success!");
    } catch (error) {
        return errorCode(res, "Backend error");
    }
}

module.exports = { createRole };
