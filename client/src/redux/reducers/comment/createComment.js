import { http } from "../../../utils/baseUrl";
export const CallCreateComment = async (data) => {
  try {
    const result = await http.post("/comment/createComment", data);
    return { isAdd: true, message: result.data.message };
  } catch (err) {
    return err;
  }
};
