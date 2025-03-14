import { http } from "../../../utils/baseUrl";

export const CallSwapStatus = async (data) => {
  try {
    const result = await http.put(`/status/updateSwapStatus`, data);
    return { isUpdate: true, result };
  } catch (err) {
    return { isUpdate: false, err };
  }
};
