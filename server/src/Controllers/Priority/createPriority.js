
const Priority = require('../../Models/Priority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const generateId = require('../../utils/generateId');

const createPriority = async (req, res) => {
    const { priority, description, deleted, alias } = req.body;
    const id = generateId("priorityId")
    try {
        const result = await Priority.create({
            id: id, priority: priority, description: description, deleted: deleted, alias: alias
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
module.exports = { createPriority }