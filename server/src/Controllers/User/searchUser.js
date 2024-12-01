const User = require('../../Models/User.model');
const { successCode, failCode } = require('../../config/reponse');

const searchUser = async (req, res) => {
    const keyWord = req.query.keyWord;
    try {
        const result = await User.find({ username: { $regex: new RegExp(keyWord, 'i') } }).select('-pass_word').select('-_id');

        const mappedResult = result.map(item => ({
            username: item.username,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            phone: item.phone,
            birth_day: item.birth_day,
            gender: item.gender,
            role: item.role,
            id: item.id
        }));
        if (keyWord == "") {
            const result = await User.find();
            successCode(res, result, "Lấy danh sách người dùng thành công!");
        }
        successCode(res, mappedResult, "Lấy danh sách người dùng thành công!");

    } catch (error) {
        failCode(res, "Backend error!");
    }
}

module.exports = { searchUser };
