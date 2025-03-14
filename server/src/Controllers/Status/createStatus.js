const Status = require("../../Models/Status.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const createStatus = async (req, res) => {
  const { statusName, deleted, alias, user, project } = req.body;
  try {
    const lastStatus = await Status.findOne({ user: user }).sort({ order: -1 });

    const newOrder = lastStatus ? lastStatus.order + 1 : 1;

    const newStatus = await Status.create({
      user: user,
      project,
      statusName,
      deleted,
      alias,
      order: newOrder,
    });

    return successCode(res, newStatus, "Status created successfully!");
  } catch (error) {
    console.error("Create Status Error:", error);
    return errorCode(res, "Internal server error");
  }
};

module.exports = { createStatus };
