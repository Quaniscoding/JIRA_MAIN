import { http } from "../../../utils/baseUrl";

export const CallUpdatePassword = async (id, data) => {
  try {
    const result = await http.put(`/user/updatePassword/${id}`, data);
    return { isUpdate: true, result };
  } catch (err) {
    return { isUpdate: false, err };
  }
};
