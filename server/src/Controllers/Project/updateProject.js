const { failCode, successCode } = require('../../config/reponse');
const Project = require('../../Models/Project.model');

const updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const options = { new: true };
        const { projectName, description, categoryId, alias } = req.body;
        const result = await Project.findByIdAndUpdate(id, { projectName, description, categoryId, alias }, options)
        if (!result) {
            failCode(res, "", "Project does not exist !");
            return;
        }
        else {
            successCode(res, result, "Update Project success !")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { updateProject }