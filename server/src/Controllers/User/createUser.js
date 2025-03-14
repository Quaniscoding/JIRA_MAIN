// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");

const User = require("../../Models/User.model");
const { failCode, successCode, errorCode } = require("../../config/response");
const createUser = async (req, res) => {
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
    const result = await User.findOne({ email: email }).select("-password");
    if (result) {
      failCode(res, "", "Email đã tồn tại!");
    } else {
      await User.create({
        username,
        first_name,
        last_name,
        email,
        password: await bcrypt.hash(password, 10),
        phone,
        birth_day,
        gender,
        role: "user",
        avatar: `https://ui-avatars.com/api/?name=${username}`,
      });
      successCode(res, "", "Create user successfully!");
    }
  } catch (error) {
    console.log(error);
    errorCode(res, "Backend error");
  }
};
module.exports = { createUser };
