import { http } from "../../../utils/baseUrl";

export const CallGetTaskDetail = async (taskId, projectId) => {
  try {
    if (!taskId && !projectId) {
      throw new Error("Missing required parameters: taskId or projectId");
    }
    const url = projectId
      ? `/task/getTaskDetail?projectId=${projectId}`
      : `/task/getTaskDetail?taskId=${taskId}`;

    const { data } = await http.get(url);
    return data.content;
  } catch (err) {
    console.error("Error fetching task details:", err);
    return {
      error: true,
      message: err.message || "Failed to fetch task details",
    };
  }
};
