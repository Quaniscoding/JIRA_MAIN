const { successCode, failCode, errorCode } = require("../../config/response");
const Project = require("../../Models/Project.model");
const deleteProject = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Project.findByIdAndDelete(id);
    if (!result) {
      failCode(res, "", "Dự án không tồn tại !");
    } else {
      successCode(res, result, "Xóa dự án thành công!");
    }
  } catch (error) {
    errorCode(res, "Backend error !");
  }
};
module.exports = {
  deleteProject,
};
