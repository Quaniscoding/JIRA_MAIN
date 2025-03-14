const { failCode, successCode, errorCode } = require("../../config/response");
const Role = require("../../Models/Role.model");

const updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    const { roleName } = req.body;
    const result = await Role.findByIdAndUpdate(
      id,
      { roleName },
      options
    ).select("-_id");
    if (!result) {
      failCode(res, "", "Role not found!");
      return;
    } else {
      successCode(res, result, "Update role successfully!");
    }
  } catch (error) {
    errorCode(res, "Backend error !");
  }
};

module.exports = { updateRole };
