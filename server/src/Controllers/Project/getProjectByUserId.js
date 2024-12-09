const Project = require('../../Models/Project.model');
const ProjectCategory = require('../../Models/ProjectCategory.model');
const { successCode, failCode } = require('../../config/reponse');

const getProjectByUserId = async (req, res) => {
    const userId = req.query.userId
    try {
        // Find projects where the userId is in either the creator or members of the project
        const projects = await Project.find({
            $or: [
                { 'creator.id': userId },
            ]
        });

        // If no projects are found
        if (projects.length === 0) {
            return failCode(res, [], "No projects found for this user!");
        }

        // Fetch project categories in parallel
        const categoryIds = projects.map(project => project.categoryId);
        const categories = await ProjectCategory.find({ id: { $in: categoryIds } });
        const categoryMap = categories.reduce((acc, category) => {
            acc[category.id] = category.projectCategoryName;
            return acc;
        }, {});

        // Map projects to include category names
        const mappedResult = projects.map(project => ({
            id: project.id,
            projectName: project.projectName,
            description: project.description,
            alias: project.alias,
            projectCategoryName: categoryMap[project.categoryId] || 'Unknown Category',
            deleted: project.deleted,
            members: project.members,
            creator: project.creator,
        }));

        successCode(res, mappedResult, "Lấy danh sách dự án thành công!");
    } catch (error) {
        failCode(res, "Backend error!");
    }
}

module.exports = { getProjectByUserId };
