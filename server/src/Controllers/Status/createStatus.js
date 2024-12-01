
const Status = require('../../Models/Status.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');

const createStatus = async (req, res) => {
    const {  statusName, deleted, alias } = req.body;
    try {
        const result = await Status.create({
            statusName: statusName, deleted: deleted, alias: alias
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
module.exports = { createStatus }