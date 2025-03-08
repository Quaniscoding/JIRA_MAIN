const User = require('../../Models/User.model');
const { successCodeLogin, failCode, errorCode } = require('../../config/reponse');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await User.findOne({ email: email }).select('-__v').select("-_id");
        if (!result) {
            return failCode(res, "", "Tài khoản không tồn tại!");
        }
        const { password: passwordHash, ...userInfo } = result.toObject();
        const checkPass = bcrypt.compareSync(password, passwordHash);
        if (!checkPass) {
            return failCode(res, "", "Email hoặc mật khẩu không đúng!");
        }
        successCodeLogin(res, userInfo, "Đăng nhập thành công!");
    } catch (error) {
        console.log(error);
        errorCode(res, "Backend error !");
    }
};

module.exports = { signIn };

