const Status = require("../../Models/Status.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const updateSwapStatus = async (req, res) => {
  try {
    const { statusId1, statusId2 } = req.body;
    if (!statusId1 || !statusId2) {
      return failCode(res, "", "Missing status IDs!");
    }

    // Bắt đầu phiên giao dịch (nếu Mongoose và MongoDB version của bạn hỗ trợ)
    const session = await Status.startSession();
    session.startTransaction();
    try {
      const status1 = await Status.findById(statusId1).session(session);
      const status2 = await Status.findById(statusId2).session(session);

      if (!status1 || !status2) {
        await session.abortTransaction();
        session.endSession();
        return failCode(res, "", "Một hoặc cả hai status không tồn tại!");
      }

      // Hoán đổi thứ tự giữa status1 và status2
      const tempOrder = status1.order;
      status1.order = status2.order;
      status2.order = tempOrder;

      await status1.save({ session });
      await status2.save({ session });

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }

    // Truy vấn lại danh sách status đã sắp xếp theo thứ tự tăng dần
    const sortedStatuses = await Status.find({}).sort({ order: 1 });
    return successCode(res, sortedStatuses, "Hoán đổi thứ tự thành công!");
  } catch (error) {
    console.error("Swap Status Order Error:", error);
    return errorCode(res, "Internal server error");
  }
};

module.exports = { updateSwapStatus };
