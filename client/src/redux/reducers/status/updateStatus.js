import { http } from "../../../utils/baseUrl";

export const CallUpdateStatus = async (statusId, data) => {
  try {
    const result = await http.put(
      `/status/updateStatus?statusId=${statusId}`,
      data
    );
    return { isUpdate: true, result };
  } catch (err) {
    return { isUpdate: false, err };
  }
};
