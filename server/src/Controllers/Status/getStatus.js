const Status = require("../../Models/Status.model");
const { successCode, failCode } = require("../../config/response");

const getStatus = async (req, res) => {
  try {
    const { projectId } = req.query;
    let result;
    if (projectId) {
      result = await Status.find({ project: projectId }).populate(
        "user",
        "username _id"
      );
      if (!result.length) {
        return successCode(res, [], "Get status successfully!");
      }
    } else {
      result = await Status.find().populate("user", "username _id");
    }

    successCode(res, result, "Get status successfully!");
  } catch (error) {
    console.error("Get Status Error:", error);
    failCode(res, "Backend error!");
  }
};

module.exports = { getStatus };
