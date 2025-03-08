const User = require('../../Models/User.model');
const generateId = require('../../utils/generateId');
const bcrypt = require('bcrypt');
const { successCode, errorCode, failCode } = require('../../config/reponse');

const signUp = async (req, res) => {
    try {
        const { username, first_name, last_name, email, password, phone, birth_day, gender } = req.body;

        if (await User.findOne({ email })) {
            return failCode(res, "", "Email đã tồn tại!");
        }

        const id = await generateId('userId');
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            id,
            username,
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            birth_day,
            gender,
            role: "user",
            avatar: `https://ui-avatars.com/api/?name=${username}`
        });

        return successCode(res, {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            phone: user.phone,
            birth_day: user.birth_day,
            gender: user.gender,
            role: user.role,
            avatar: user.avatar
        }, "Đăng ký tài khoản thành công!");

    } catch (error) {
        console.error(error);
        return errorCode(res, "Backend error");
    }
};

module.exports = { signUp };

