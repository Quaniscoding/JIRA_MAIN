const Project = require('../../Models/Project.model');
const ProjectCategory = require('../../Models/ProjectCategory.model');
const { successCode, failCode } = require('../../config/reponse');

const getAllProject = async (req, res) => {
    const keyWord = req.query.keyWord || '';
    try {
        // Find projects based on keyword
        const projects = await Project.find({ projectName: { $regex: new RegExp(keyWord, 'i') } });

        // If no projects are found
        if (projects.length === 0) {
            return failCode(res, [], "No projects found!");
        }

        // Fetch project categories in parallel
        const categoryIds = projects.map(project => project.categoryId);
        const categories = await ProjectCategory.find({ _id: { $in: categoryIds } });
        const categoryMap = categories.reduce((acc, category) => {
            acc[category._id] = category.projectCategoryName;
            return acc;
        }, {});

        // Map projects to include category names
        const mappedResult = projects.map(project => ({
            projectName: project.projectName,
            description: project.description,
            alias: project.alias,
            projectCategoryName: categoryMap[project.categoryId] || 'Unknown Category',
            deleted: project.deleted,
            members: project.members,
            creator: project.creator,
            _id: project._id
        }));

        successCode(res, mappedResult, "Lấy danh sách dự án thành công!");
    } catch (error) {
        failCode(res, "Backend error!");
    }
}

module.exports = { getAllProject };
