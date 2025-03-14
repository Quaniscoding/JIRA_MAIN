import { http } from "../../../utils/baseUrl";

export const CallGetListPriority = async () => {
  try {
    const result = await http.get(`/priority/getPriority`);
    return result.data.content;
  } catch (err) {
    return err;
  }
};
