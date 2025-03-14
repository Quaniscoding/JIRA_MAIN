import { http } from "../../../utils/baseUrl";

export const CallUpdateUser = async (id, data) => {
  try {
    const result = await http.put(`/user/updateUser/${id}`, data);
    return { isUpdate: true, message: result.data.message };
  } catch (err) {
    return { isUpdate: false, message: err.response.data.message };
  }
};
