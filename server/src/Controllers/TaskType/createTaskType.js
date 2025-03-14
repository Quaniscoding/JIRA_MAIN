const TaskType = require("../../Models/TaskType.model");
const { failCode, successCode, errorCode } = require("../../config/response");

const createTaskType = async (req, res) => {
  const { taskType } = req.body;
  const id = generateId("taskTypeId");
  try {
    const result = await TaskType.create({
      id: id,
      taskType: taskType,
    });
    if (result == "") {
      failCode(res, "", "Create fail!");
    } else {
      successCode(res, result, "Create success !");
    }
  } catch (error) {
    errorCode(res, "Backend error");
  }
};
module.exports = { createTaskType };
