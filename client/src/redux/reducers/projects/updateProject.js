// import { history } from '../../../utils/history';
import { http } from "./../../../utils/baseUrl";

export const callUpdateProject = async (projectId, data) => {
  try {
    const result = await http.put(`/Project/updateProject/${projectId}`, data);
    return { isUpdate: true, message: result.data.message };
  } catch (err) {
    return {
      isUpdate: false,
      message: err.response?.data?.message || "Update failed!",
    };
  }
};
