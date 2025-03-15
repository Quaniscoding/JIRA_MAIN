import { http } from "../../../utils/baseUrl";

export const CallCreateRole = async (data) => {
  try {
    await http.post("/role/createRole", data);
    return { isCreate: true };
  } catch (error) {
    console.log(error);
  }
};
export const CallGetAllRole = async () => {
  try {
    const res = await http.get("/role/getRole");
    return res.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const CallUpdateRole = async (id, data) => {
  try {
    await http.put(`/role/updateRole/${id}`, data);
    return { isUpdate: true };
  } catch (error) {
    console.log(error);
  }
};

export const CallDeleteRole = async (id) => {
  try {
    await http.delete(`/role/deleteRole/${id}`);
    return { isDelete: true };
  } catch (error) {
    console.log(error);
  }
};
