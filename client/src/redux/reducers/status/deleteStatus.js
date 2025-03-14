import { http } from "../../../utils/baseUrl";

export const CallDeleteStatus = async (statusId) => {
  try {
    const result = await http.delete(
      `/status/deleteStatus?statusId=${statusId}`
    );
    return { isDelete: true, result };
  } catch (err) {
    return { isDelete: false, err };
  }
};
