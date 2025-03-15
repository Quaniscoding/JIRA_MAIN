import { http } from "../../../utils/baseUrl";

export const CallCreateUser = async (data) => {
  try {
    const result = await http.post("/user/createUser", data);
    return { isCreate: true, message: result.data.message };
  } catch (err) {
    return err;
  }
};

export const CallUpdateUser = async (id, data) => {
  try {
    const result = await http.put(`/user/updateUser/${id}`, data);
    return { isUpdate: true, message: result.data.message };
  } catch (err) {
    return { isUpdate: false, message: err.response.data.message };
  }
};

export const CallDeleteUser = async (userId) => {
  try {
    const result = await http.delete(`/user/deleteUser/${userId}`);
    return { isDelete: true, message: result.data.message };
  } catch (err) {
    return { isDelete: false, message: err.response.data.message };
  }
};

export const CallGetListUserByPagination = async (
  page,
  limit,
  keyword,
  sortBy,
  sort
) => {
  try {
    const result = await http.get(
      `/user/pagination?page=${page}&limit=${limit}&keyword=${keyword}&sortBy=${sortBy}&sort=${sort}`
    );
    return result.data.content;
  } catch (err) {
    return err;
  }
};

export const CallGetUserById = async (id) => {
  try {
    const result = await http.get(`/user/getUserById/${id}`);
    return result.data.content;
  } catch (err) {
    return err;
  }
};

export const CallUpdatePassword = async (id, data) => {
  try {
    const result = await http.put(`/user/updatePassword/${id}`, data);
    return { isUpdate: true, result };
  } catch (err) {
    return { isUpdate: false, err };
  }
};

export const CallGetListUser = (keyWord) => async () => {
  try {
    if (keyWord) {
      const result = await http.get(`/user/getUser?keyWord=${keyWord}`);
      return result.data.content;
    } else {
      const result = await http.get(`/user/getUser`);
      return result.data.content;
    }
  } catch (err) {
    return { err };
  }
};
