import { http } from "../../../utils/baseUrl";

export const CallUpdateTask = async (taskId, data) => {
  try {
    const result = await http.put(`/task/updateTask?taskId=${taskId}`, data);
    return { isUpdated: true, message: result.data.message };
  } catch (err) {
    return { isUpdated: false, message: err.response.data.message };
  }
};
