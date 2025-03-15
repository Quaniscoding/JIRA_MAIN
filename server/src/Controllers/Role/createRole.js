const { failCode, successCode, errorCode } = require("../../config/response");
const Role = require("../../Models/Role.model");

const createRole = async (req, res) => {
  try {
    const { name, alias } = req.body;

    const existingRole = await Role.findOne({ name: name });
    if (existingRole) {
      return failCode(res, "", "Role name already exists!");
    }

    const result = await Role.create({ name, deleted: false, alias });
    if (!result) {
      return failCode(res, "", "Create fail!");
    }

    return successCode(res, result, "Create success!");
  } catch (error) {
    console.log(error);
    return errorCode(res, "Backend error");
  }
};

module.exports = { createRole };
