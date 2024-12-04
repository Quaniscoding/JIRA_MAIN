const ProjectCategory = require('../../Models/ProjectCategory.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const generateId = require('../../utils/generateId');

const createProjectCategory = async (req, res) => {
    const {  projectCategoryName } = req.body;
    const id = await generateId('projectCategory');
    try {
        const result = await ProjectCategory.create({
            id:id,
            projectCategoryName: projectCategoryName
        })
        if (result == "") {
            failCode(res, "", "Create fail!")
        }
        else {
            successCode(res, result, "Create success !")
        }
    } catch (error) {
        errorCode(res, "Backend error")
    }

}
module.exports = { createProjectCategory }
