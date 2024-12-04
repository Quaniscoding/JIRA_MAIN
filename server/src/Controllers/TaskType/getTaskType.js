const TaskType = require('../../Models/TaskType.model');
const { successCode, failCode } = require('../../config/reponse');

const getTaskType = async (req, res) => {
    try {
        const result = await TaskType.find().select("-_id")
        if (result == "") {
            failCode(res, "", "List TaskType is not exist !")
        }
        else {
            successCode(res, result, "Get list Task Type success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getTaskType }
