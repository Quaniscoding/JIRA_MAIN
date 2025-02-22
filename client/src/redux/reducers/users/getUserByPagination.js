import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";

const initialState = {
    listUser: [],
};

const getUserByPagination = createSlice({
    name: "getUserByPagination",
    initialState,
    reducers: {
        getListUser: (state, { type, payload }) => {
            state.listUser = payload;
        },
    },
});

export const { getListUser } = getUserByPagination.actions;

export default getUserByPagination.reducer;

export const callGetUserByPagination = (page, limit, keyWord) => {
    return async (dispatch) => {
        try {
            if (!keyWord) {
                const response = await http.get(`/user/pagination?page=${page}&limit=${limit}`);
                dispatch(getListUser(response.data.content));
            }
            const response = await http.get(`/user/pagination?page=${page}&limit=${limit}&keyWord=${keyWord}`);
            dispatch(getListUser(response.data.content));
        } catch (err) {
            return err;
        }
    };
};