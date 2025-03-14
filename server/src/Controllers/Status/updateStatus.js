const { failCode, successCode, errorCode } = require("../../config/response");
const Status = require("../../Models/Status.model");

const updateStatus = async (req, res) => {
  try {
    const { statusId } = req.query;
    let { order, statusName, deleted, alias, project } = req.body;

    if (!statusName || !project) {
      return failCode(res, "", "Missing required fields!");
    }

    // Tìm status cơ bản bằng statusId
    const status = await Status.findById(statusId);
    if (!status) {
      return failCode(res, "", "Status not found!");
    }

    // Cập nhật thống tin status
    status.order = order;
    status.statusName = statusName;
    status.deleted = deleted;
    status.alias = alias;
    status.project = project;
    await status.save();

    // Truy vấn và trả về danh sách status được sắp xếp theo thứ tự tăng dần
    const sortedStatuses = await Status.find({}).sort({ order: 1 });
    return successCode(res, sortedStatuses, "Status updated successfully!");
  } catch (error) {
    console.error("Update Status Error:", error);
    return errorCode(res, "Internal server error");
  }
};

module.exports = { updateStatus };
