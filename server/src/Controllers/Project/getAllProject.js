const Project = require("../../Models/Project.model");
const ProjectCategory = require("../../Models/ProjectCategory.model");
const { successCode, failCode } = require("../../config/response");

const getAllProject = async (req, res) => {
  const keyWord = req.query.keyWord || "";
  try {
    // Find projects based on keyword
    const projects = await Project.find({
      projectName: { $regex: new RegExp(keyWord, "i") },
    });

    // If no projects are found
    if (projects.length === 0) {
      return failCode(res, [], "No projects found!");
    }

    // Fetch project categories in parallel
    const categoryIds = projects.map((project) => project.categoryId);
    const categories = await ProjectCategory.find({ id: { $in: categoryIds } });
    const categoryMap = categories.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {});

    // Map projects to include category names
    const mappedResult = projects.map((project) => ({
      id: project.id,
      projectName: project.projectName,
      description: project.description,
      alias: project.alias,
      name: categoryMap[project.categoryId] || "Unknown Category",
      deleted: project.deleted,
      members: project.members,
      creator: project.creator,
    }));

    successCode(res, mappedResult, "Lấy danh sách dự án thành công!");
  } catch (error) {
    failCode(res, "Backend error!");
  }
};

module.exports = { getAllProject };
