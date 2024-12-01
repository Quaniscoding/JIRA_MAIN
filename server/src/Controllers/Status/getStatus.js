const Status = require('../../Models/Status.model');
const { successCode, failCode } = require('../../config/reponse');

const getStatus = async (req, res) => {
    try {
        const result = await Status.find()
        if (result == "") {
            failCode(res, "", "List Status is not exist !")
        }
        else {
            successCode(res, result, "Get list Status success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getStatus }
