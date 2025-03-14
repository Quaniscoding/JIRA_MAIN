const { failCode, successCode, errorCode } = require("../../config/response");
const Status = require("../../Models/Status.model");

const deleteStatus = async (req, res) => {
  try {
    const { statusId } = req.query;
    console.log(statusId);

    const deletedStatus = await Status.findByIdAndDelete(statusId);

    if (!deletedStatus) {
      return failCode(res, "", "Status not found!");
    }
    return successCode(res, deletedStatus, "Status deleted successfully!");
  } catch (error) {
    console.error("Delete Status Error:", error);
    return errorCode(res, "Internal server error");
  }
};

module.exports = { deleteStatus };
