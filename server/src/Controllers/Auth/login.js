const User = require("../../Models/User.model");
const {
  successCodeLogin,
  failCode,
  errorCode,
} = require("../../config/response");
const bcrypt = require("bcryptjs");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await User.findOne({ email: email }).select("-__v");
    if (!result) {
      return failCode(res, "", "Account not found!");
    }
    const { password: passwordHash, ...userInfo } = result.toObject();
    const checkPass = bcrypt.compareSync(password, passwordHash);
    if (!checkPass) {
      return failCode(res, "", "Email or password is incorrect!");
    }
    successCodeLogin(res, userInfo, "Login successfully!");
  } catch (error) {
    errorCode(res, "Backend error !");
  }
};

module.exports = { signIn };
