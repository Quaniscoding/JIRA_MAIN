import { http } from "../../../utils/baseUrl";

export const CallCreateTask = async (data) => {
  try {
    const result = await http.post("/task/createTask", data);
    return { isCreate: true, message: result.data.message };
  } catch (err) {
    return { isCreate: false, message: err.response.data.message };
  }
};
