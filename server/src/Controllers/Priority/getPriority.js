const Priority = require('../../Models/Priority.model');
const { successCode, failCode } = require('../../config/reponse');

const getPriority = async (req, res) => {
    try {
        const result = await Priority.find().select("-_id")
        if (result == "") {
            failCode(res, "", "List Priority is not exist !")
        }
        else {
            successCode(res, result, "Get list Priority success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getPriority }
