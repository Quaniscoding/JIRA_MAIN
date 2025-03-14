import { http } from "../../../utils/baseUrl";
export const CallUpdateComment = async (commentId, contentComment) => {
  try {
    const result = await http.put(
      `/comment/updateComment?commentId=${commentId}`,
      contentComment
    );
    return { isUpdated: true, message: result.data.message };
  } catch (err) {
    return err;
  }
};
