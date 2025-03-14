const { failCode, successCode } = require("../../config/response");
const User = require("../../Models/User.model");
const { uploadCloud, cloudinary } = require("../../config/cloudinary");
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Lấy thông tin user hiện tại
    const user = await User.findById(id);
    if (!user) {
      return failCode(res, "", "User not found!");
    }

    const {
      username,
      first_name,
      last_name,
      email,
      phone,
      gender,
      role,
      birth_day,
    } = req.body;

    const updateFields = {};

    if (username && username !== user.username) {
      updateFields.username = username;
    }
    if (first_name && first_name !== user.first_name) {
      updateFields.first_name = first_name;
    }
    if (last_name && last_name !== user.last_name) {
      updateFields.last_name = last_name;
    }
    if (email && email !== user.email) {
      updateFields.email = email;
    }
    if (phone && phone !== user.phone) {
      updateFields.phone = phone;
    }
    if (gender && gender !== user.gender) {
      updateFields.gender = gender;
    }
    if (role && role !== user.role) {
      updateFields.role = role;
    }
    if (
      birth_day &&
      new Date(birth_day).getTime() !== new Date(user.birth_day).getTime()
    ) {
      updateFields.birth_day = birth_day;
    }

    if (Object.keys(updateFields).length === 0) {
      return successCode(res, user, "No changes detected.");
    }

    // Cập nhật user với các trường đã thay đổi
    const result = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).select("-password");

    return successCode(res, result, "Update user successfully!");
  } catch (error) {
    console.log(error);
    return failCode(res, "Backend error !");
  }
};

module.exports = { updateUser, uploadCloud: uploadCloud("avatar") };
