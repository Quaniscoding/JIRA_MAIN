const User = require("../../Models/User.model");
const { successCode, failCode } = require("../../config/response");

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findById(id).select("-role");
    if (!result) {
      return failCode(res, "", "User not found!");
    } else {
      return successCode(res, result, "Get user successfully!");
    }
  } catch (error) {
    return failCode(res, "Backend error !");
  }
};

module.exports = { getUserById };
