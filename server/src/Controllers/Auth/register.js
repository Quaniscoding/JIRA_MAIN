const User = require("../../Models/User.model");
const Role = require("../../Models/Role.model");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

const { successCode, errorCode, failCode } = require("../../config/response");

const signUp = async (req, res) => {
  try {
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      phone,
      birth_day,
      gender,
    } = req.body;

    if (await User.findOne({ email })) {
      return failCode(res, "", "Email đã tồn tại!");
    }

    const id = await generateId("userId");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tìm role "user" trong database
    const userRole = await Role.findOne({ name: "user" });
    if (!userRole) {
      return failCode(res, "", "Role 'user' not found!");
    }

    // Tạo user mới với role "user"
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
      role: userRole._id,
      avatar: `https://ui-avatars.com/api/?name=${username}`,
      deleted: false,
    });

    return successCode(
      res,
      {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        birth_day: user.birth_day,
        gender: user.gender,
        role: userRole.name, // Trả về tên role thay vì ObjectId
        avatar: user.avatar,
      },
      "Đăng ký tài khoản thành công!"
    );
  } catch (error) {
    console.error(error);
    return errorCode(res, "Backend error");
  }
};

module.exports = { signUp };
