const Piority = require('../../Models/Piority.model');
const { successCode, failCode } = require('../../config/reponse');

const getPiority = async (req, res) => {
    try {
        const result = await Piority.find().select("-_id")
        if (result == "") {
            failCode(res, "", "List Piority is not exist !")
        }
        else {
            successCode(res, result, "Get list Piority success!")
        }
    } catch (error) {
        failCode(res, "Backend error !")
    }
}
module.exports = { getPiority }
