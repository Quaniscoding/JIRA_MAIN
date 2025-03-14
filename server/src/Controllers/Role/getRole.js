const { failCode } = require("../../config/response");
const Role = require("../../Models/Role.model");

const getRole = async (req, res) => {
  try {
    const role = await Role.find();
    successCode(res, role, "Get role successfully!");
  } catch (error) {
    failCode(res, "Backend error!");
  }
};

module.exports = { getRole };
