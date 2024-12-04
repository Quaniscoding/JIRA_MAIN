
const Piority = require('../../Models/Piority.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const generateId = require('../../utils/generateId');

const createPiority = async (req, res) => {
    const { piority, description, deleted, alias } = req.body;
    const id = generateId("piorityId")
    try {
        const result = await Piority.create({
            id: id, piority: piority, description: description, deleted: deleted, alias: alias
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
module.exports = { createPiority }