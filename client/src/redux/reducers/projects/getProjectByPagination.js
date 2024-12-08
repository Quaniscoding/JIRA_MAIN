import { createSlice } from "@reduxjs/toolkit";
import { http } from "../../../utils/baseUrl";

const initialState = {
    listProjectByPagination: []
}
const getProjectByPagination = createSlice({
    name: "getProjectByPagination",
    initialState,
    reducers: {
        // eslint-disable-next-line no-unused-vars
        getListProjectByPagination: (state, { type, payload }) => {
            state.listProjectByPagination = payload;
        }
    }
});
export const { getListProjectByPagination } = getProjectByPagination.actions
export default getProjectByPagination.reducer
export const callGetListProjectByPagination = (pageSize,pageIndex,keyword) => async (dispatch) => {
    try {
        const result = await http.get(`/project/getProject/getProjectByPagination?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`)
        dispatch(getListProjectByPagination(result.data.content));
    } catch (err) {
        console.log(err);
        
        return err
    }
}
