import { http } from "../../../utils/baseUrl";

export const CallDeleteComment = async (commentId) => {
  try {
    const result = await http.delete(
      `/comment/deleteComment?commentId=${commentId}`
    );
    return { isDeleted: true, message: result.data.message };
  } catch (err) {
    return err;
  }
};
