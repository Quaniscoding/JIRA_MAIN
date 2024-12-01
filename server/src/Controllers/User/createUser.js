const bcrypt = require('bcrypt');
const User = require('../../Models/User.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const generateId = require('../../utils/generateId');
const createUser = async (req, res) => {
    try {
        const { username, first_name,
            last_name, email, pass_word, phone, birth_day, gender } = req.body;
        const id = await generateId('userId');
        const result = await User.findOne({ email: email }).select('-pass_word').select('-_id');
        if (result) {
            failCode(res, "", "Email đã tồn tại!")
        }
        else {
            await User.create({
                id,
                username,
                first_name,
                last_name,
                email,
                pass_word: await bcrypt.hash(pass_word, 10),
                phone,
                birth_day,
                gender,
                role: "user",
                avatar: `https://ui-avatars.com/api/?name=${username}`
            });
            successCode(res, "", "Tạo tài khoản thành công!");
        }
    } catch (error) {
        errorCode(res, "Backend error")
    }
}
module.exports = { createUser }
