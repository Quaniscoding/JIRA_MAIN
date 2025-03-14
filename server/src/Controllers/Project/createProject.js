const Project = require("../../Models/Project.model");
const Status = require("../../Models/Status.model");
const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const createProject = async (req, res) => {
  const { projectName, description, category, alias, creator } = req.body;
  try {
    // Kiểm tra người dùng có tồn tại không
    const userExist = await User.findById(creator);
    if (!userExist) {
      return failCode(res, "", "User does not exist!");
    }

    // Tạo Project
    const project = await Project.create({
      projectName,
      description,
      category,
      alias,
      deleted: "false",
      creator,
    });

    // Danh sách status mặc định
    const defaultStatuses = [
      { statusName: "Backlog", alias: "backlog" },
      { statusName: "Doing", alias: "doing" },
      { statusName: "Done", alias: "done" },
      { statusName: "Testing", alias: "testing" },
    ];

    // Tạo 4 status mặc định cho project
    const statuses = await Promise.all(
      defaultStatuses.map((status, index) =>
        Status.create({
          user: creator,
          project: project._id,
          statusName: status.statusName,
          alias: status.alias,
          deleted: "false",
          order: index + 1,
        })
      )
    );

    return successCode(
      res,
      { project, statuses },
      "Create project successfully!"
    );
  } catch (error) {
    console.error("Create Project Error:", error);
    return errorCode(res, "Backend error");
  }
};

module.exports = { createProject };
