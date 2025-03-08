const User = require('../../Models/User.model');
const { successCode, failCode } = require('../../config/reponse');

const getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.findOne({ id }).select('-password').select('-_id')
        if (!result) {
            return failCode(res, "", "Người dùng không tồn tại !");
        } else {
            return successCode(res, result, "Lấy dữ liệu người dùng thành công!");
        }
    } catch (error) {
        return failCode(res, "Backend error !");
    }
}

module.exports = { getUserById }