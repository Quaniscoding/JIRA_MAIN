const bcrypt = require('bcrypt');
const User = require('../../Models/User.model');
const { failCode, successCode, errorCode } = require('../../config/reponse');
const generateId = require('../../utils/generateId');
const createUser = async (req, res) => {
    try {
        const { username, first_name,
            last_name, email, password, phone, birth_day, gender } = req.body;
        const id = await generateId('userId');
        const result = await User.findOne({ email: email }).select('-password').select('-_id');
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
                password: await bcrypt.hash(password, 10),
                phone,
                birth_day,
                gender,
                role: "user",
                avatar: `https://ui-avatars.com/api/?name=${username}`
            });
            successCode(res, "", "Tạo tài khoản thành công!");
        }
    } catch (error) {
        console.log(error);
        errorCode(res, "Backend error")
    }
}
module.exports = { createUser }
