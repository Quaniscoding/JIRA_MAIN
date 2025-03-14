import { http } from "../../../utils/baseUrl";

export const CallDeleteTask = async (taskId) => {
  try {
    const result = await http.delete(`/task/deleteTask?taskId=${taskId}`);
    return { isDelete: true, message: result.data.message };
  } catch (err) {
    return { isDelete: false, message: err.response.data.message };
  }
};
