const { failCode, successCode, errorCode } = require("../../config/response");
const Role = require("../../Models/Role.model");

const deleteRole = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Role.findByIdAndDelete(id);
    if (!result) {
      failCode(res, "", "Role not found!");
    } else {
      successCode(res, result, "Delete role successfully!");
    }
  } catch (error) {
    errorCode(res, "Backend error!");
  }
};

module.exports = { deleteRole };
