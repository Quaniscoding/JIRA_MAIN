import { http } from "../../../utils/baseUrl";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listProject: []
}
const getAllProjectByPagination = createSlice({
    name: "getAllProject",
    initialState,
    reducers: {
        getListProjectByPagination: (state, { type, payload }) => {
            state.listProject = payload;
        }
    }
});
export const { getListProjectByPagination } = getAllProjectByPagination.actions
export default getAllProjectByPagination.reducer
export const callGetListProjectByPagination = (pageSize, pageIndex, keyword = "", sort,sortBy) => async (dispatch) => {
    try {
        let url = `/project/getProject/getProjectByPagination?pageSize=${pageSize}&pageIndex=${pageIndex}&sort=${sort}&sortBy=${sortBy}`;

        if (keyword) {
            url += `&keyword=${encodeURIComponent(keyword)}`;
        }

        const result = await http.get(url);
        dispatch(getListProjectByPagination(result.data.content));
        return result.data.content;
        
    } catch (err) {
        return err;
    }
};

