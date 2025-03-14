const { failCode, successCode, errorCode } = require("../../config/response");
const Role = require("../../Models/Role.model");

const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    const existingRole = await Role.findOne({ roleName });
    if (existingRole) {
      return failCode(res, "", "Role name already exists!");
    }

    const result = await Role.create({ roleName });
    if (!result) {
      return failCode(res, "", "Create fail!");
    }

    return successCode(res, result, "Create success!");
  } catch (error) {
    return errorCode(res, "Backend error");
  }
};

module.exports = { createRole };
