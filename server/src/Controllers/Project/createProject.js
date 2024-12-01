const Project = require('../../Models/Project.model');
const Status = require('../../Models/Status.model');
const ProjectCategory = require('../../Models/ProjectCategory.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const createProject = async (req, res) => {
    const { projectName, description, categoryId, alias } = req.body;
    const creatorId = req.user._id;
    const creatorName = req.user.username;

    try {
        const projectExist = await Project.findOne({ projectName, categoryId });

        if (projectExist) {
            return failCode(res, "", "Project name already exists in this category");
        }

        const categoryExist = await ProjectCategory.findOne({ _id: categoryId });

        if (!categoryExist) {
            return failCode(res, "", "Project category doesn't exist!");
        }


        const dataStatus = await Status.find();


        const listTask = dataStatus.map(status => ({
            listTaskDetail: [],
            statusId: status._id,
            statusName: status.name,
            alias: status.alias
        }));
        const result = await Project.create({
            projectName,
            description,
            categoryId,
            alias,
            deleted: "false",
            creator: {
                _id: creatorId,
                username: creatorName
            },
            listTask: listTask
        });
        const responseData = {
            ...result.toObject(),
            creator: creatorId
        };
        delete responseData.listTask;
        return successCode(res, responseData, "Create project success!");

    } catch (error) {
        return errorCode(res, "Backend error");
    }
};

module.exports = { createProject };
