// import { createSlice } from '@reduxjs/toolkit'
import { http } from "../../../utils/baseUrl";

export const callGetListUser = (keyWord) => async () => {
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
