import { http } from "../../../utils/baseUrl";

export const CallGetListStatus = async (projectId) => {
  try {
    const url = projectId
      ? `/status/getStatus?projectId=${projectId}`
      : `/status/getStatus`;
    const result = await http.get(url);
    return result.data.content;
  } catch (err) {
    console.error("Error fetching statuses:", err);
    return [];
  }
};
