const Project = require('../../Models/Project.model');
const Status = require('../../Models/Status.model');
const ProjectCategory = require('../../Models/ProjectCategory.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const generateId = require('../../utils/generateId');

const createProject = async (req, res) => {
    const { projectName, description, categoryId, alias } = req.body;
    const creatorId = req.user.id;
    const creatorName = req.user.username;
    try {
    const projectExist = await Project.findOne({ projectName, categoryId });

    if (projectExist) {
        return failCode(res, "", "Dự án đã tồn tại!");
    }

    const categoryExist = await ProjectCategory.findOne({ id: categoryId });

    if (!categoryExist) {
        return failCode(res, "", "Dự án không tồn tại!");
    }


    const dataStatus = await Status.find();


    const listTask = dataStatus.map(status => ({
        listTaskDetail: [],
        statusId: status.id,
        statusName: status.statusName,
        alias: status.alias
    }));
    const id = await generateId('projectId');
    const result = await Project.create({
        id: id,
        projectName,
        description,
        categoryId,
        alias,
        deleted: "false",
        creator: {
            id: creatorId,
            username: creatorName
        },
        listTask: listTask
    });

    const responseData = {
        id: result.id,
        projectName: result.projectName,
        description: result.description,
        categoryId: result.categoryId,
        alias: result.alias,
        deleted: result.deleted,
        listTask: listTask,
        creator: creatorId
    };
    delete responseData.listTask;
    return successCode(res, responseData, "Tạo dự án thành công!");

    } catch (error) {
        return errorCode(res, "Backend error");
    }
};

module.exports = { createProject };
