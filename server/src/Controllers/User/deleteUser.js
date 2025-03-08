const { successCode, failCode, errorCode } = require("../../config/reponse");
const User = require('../../Models/User.model')
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await User.findOneAndDelete({ id }).select('-password').select('-_id');
        if (!result) {
            return failCode(res, "", 'Người dùng không tồn tại!');
        } else {
            return successCode(res, result, "Xoá người dùng thành công!");
        }
    } catch (error) {
        return errorCode(res, "Backend error !");
    }
};

module.exports = {
    deleteUser,
};
