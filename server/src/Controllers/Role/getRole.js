const { failCode } = require('../../config/reponse');
const Role = require('../../Models/Role.model');

const getRole = async (req, res) => {
    try {
        const role = await Role.find();
        successCode(res, role, "Lấy danh sách role thành công!");
    } catch (error) {
        failCode(res, "Backend error!");
    }
}

module.exports = { getRole };
