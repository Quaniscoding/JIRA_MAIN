import { http } from "../../../utils/baseUrl";

export const CallGetUserById = async (id) => {
  try {
    const result = await http.get(`/user/getUserById/${id}`);
    return result.data.content;
  } catch (err) {
    return err;
  }
};
