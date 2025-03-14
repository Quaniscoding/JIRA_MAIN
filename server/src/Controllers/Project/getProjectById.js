const { failCode, successCode } = require("../../config/response");
const Project = require("../../Models/Project.model");

const getProjectById = async (req, res) => {
  const id = req.query.id;
  try {
    const result = await Project.findById(id)
      .populate("category")
      .populate("creator", "username _id")
      .populate("members", "username _id");
    if (result == "") {
      failCode(res, "", "Project does not exist!");
    } else {
      successCode(res, result, "Successfully retrieved project list!");
    }
  } catch (error) {
    console.log(error);
    failCode(res, "Backend error !");
  }
};
module.exports = { getProjectById };
