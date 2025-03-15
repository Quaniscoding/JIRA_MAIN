const { failCode, successCode, errorCode } = require("../../config/response");
const Role = require("../../Models/Role.model");

const updateRole = async (req, res) => {
  try {
    const id = req.params.id;
    const options = { new: true };
    const { name, alias } = req.body;
    const result = await Role.findByIdAndUpdate(id, { name, alias }, options);
    if (!result) {
      failCode(res, "", "Role not found!");
      return;
    } else {
      successCode(res, result, "Update role successfully!");
    }
  } catch (error) {
    console.log(error);
    errorCode(res, "Backend error !");
  }
};

module.exports = { updateRole };
