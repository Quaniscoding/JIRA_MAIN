import { http } from "../../../utils/baseUrl";

export const callDeleteUser = (userId) => async () => {
  try {
    const result = await http.delete(`/user/deleteUser/${userId}`);
    return { message: result.data.message };
  } catch (err) {
    return { message: err.response.data.message };
  }
};
