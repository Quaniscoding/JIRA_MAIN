
const Project = require('../../Models/Project.model');

const { successCode, failCode } = require('../../config/reponse');

const getProjectDetail = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Project.find({ _id: id })
        if (result == "") {
            failCode(res, "", "List Project is not exist !")
        }
        else {
            successCode(res, result, "Get list Project success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getProjectDetail }