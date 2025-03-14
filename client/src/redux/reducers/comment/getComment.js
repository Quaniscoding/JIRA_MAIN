import { http } from "../../../utils/baseUrl";

export const CallGetComment = async (id) => {
  try {
    const result = await http.get(`/comment/getComment?taskId=${id}`);
    return result.data.content;
  } catch (err) {
    return err;
  }
};
