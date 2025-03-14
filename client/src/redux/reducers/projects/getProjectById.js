import { http } from "../../../utils/baseUrl";

export const CallGetProjectById = async (id) => {
  try {
    const result = await http.get(`/project/getProjectById?id=${id}`);
    return result.data.content;
  } catch (error) {
    return error;
  }
};
