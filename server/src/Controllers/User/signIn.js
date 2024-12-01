const User = require('../../Models/User.model');
const { successCodeLogin, failCode } = require('../../config/reponse');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
    try {
        const { email, pass_word } = req.body;
        const result = await User.findOne({ email: email }).select('-__v').select("-_id");
        if (result) {
            const { pass_word: passwordHash, ...userInfo } = result.toObject();
            const checkPass = bcrypt.compareSync(pass_word, passwordHash);
            if (checkPass) {
                successCodeLogin(res, userInfo, "Đăng nhập thành công!");
            } else {
                failCode(res, "", "Email hoặc mật khẩu không đúng!");
            }
        } else {
            failCode(res, "", "Tài khoản không tồn tại!");
        }
    } catch (error) {
        failCode(res, "Backend error !");
    }
};

module.exports = { signIn };
