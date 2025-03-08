const { failCode, successCode } = require('../../config/reponse');
const User = require('../../Models/User.model');

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { username, first_name, last_name, email, phone, birthday, gender, role, birth_day } = req.body;

        const result = await User.findOneAndUpdate(
            { id },
            { username, first_name, last_name, email, phone, birthday, gender, role, birth_day },
            { new: true }
        ).select('-password').select('-_id');

        if (!result) {
            return failCode(res, "", "Người dùng không tồn tại!");
        } else {
            return successCode(res, result, "Cập nhật người dùng thành công!");
        }
    } catch (error) {
        return failCode(res, "Backend error !");
    }
};

module.exports = { updateUser }