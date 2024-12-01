const ProjectCategory = require('../../Models/ProjectCategory.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const createProjectCategory = async (req, res) => {
    const {  projectCategoryName } = req.body;
    try {
        const result = await ProjectCategory.create({
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
