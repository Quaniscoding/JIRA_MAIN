const ProjectCategory = require("../../Models/ProjectCategory.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const createProjectCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const result = await ProjectCategory.create({
      name: name,
    });
    if (result == "") {
      failCode(res, "", "Create fail!");
    } else {
      successCode(res, result, "Create success !");
    }
  } catch (error) {
    errorCode(res, "Backend error");
  }
};
module.exports = { createProjectCategory };
