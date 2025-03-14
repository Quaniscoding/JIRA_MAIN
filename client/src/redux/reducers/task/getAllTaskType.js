import { http } from "../../../utils/baseUrl";

export const CallGetListTaskType = async () => {
  try {
    const result = await http.get(`/taskType/getTasktype`);
    return result.data.content;
  } catch (err) {
    return err;
  }
};
