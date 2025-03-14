const bcrypt = require("bcryptjs");
const { failCode, successCode } = require("../../config/response");
const User = require("../../Models/User.model");

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return failCode(res, "", "User not found!");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return failCode(res, "", "Current password is incorrect!");
    }

    if (newPassword !== confirmPassword) {
      return failCode(res, "", "New passwords do not match!");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return successCode(res, "", "Password updated successfully!");
  } catch (error) {
    console.error(error);
    return failCode(res, "Backend error!");
  }
};

module.exports = { updatePassword };
