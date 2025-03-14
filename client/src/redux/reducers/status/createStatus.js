import { http } from "../../../utils/baseUrl";

export const CallCreateStatus = async (data) => {
  try {
    const result = await http.post(`/status/createStatus`, data);
    return { isCreate: true, result };
  } catch (err) {
    return { isCreate: false, err };
  }
};
