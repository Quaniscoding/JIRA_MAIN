const ProjectCategory = require('../../Models/ProjectCategory.model');
const { successCode, failCode } = require('../../config/reponse');

const getProjectCategory = async (req, res) => {
    const { id } = req.query;
    try {
        if (id) {
            const result = await ProjectCategory.findOne({ id: id });
            if (!result) {
                return failCode(res, "", "Project Category does not exist!");
            }
            return successCode(res, result, "Get Project Category success!");
        } else {
            const result = await ProjectCategory.find().select("-_id");
            if (result.length === 0) {
                return failCode(res, "", "No Project Categories found!");
            }
            return successCode(res, result, "Get list of Project Categories success!");
        }
    } catch (error) {
        return failCode(res, "Backend error!");
    }
}

module.exports = { getProjectCategory }
