import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listTaskDetail: []
}

const getTaskDetail = createSlice({
    name: "getTaskDetail",
    initialState,
    reducers: {
        getlistTaskDetail: (state, { type, payload }) => {
            state.listTaskDetail = payload;
        }
    }
});

export const { getlistTaskDetail } = getTaskDetail.actions

export default getTaskDetail.reducer
export const callGetTaskDetail = (taskId) => async (dispatch) => {
    try {
        const result = await http.get(`/project/getTaskDetail/${taskId}`)
        dispatch(getlistTaskDetail(result.data.content));
    } catch (err) {
        return { message: err.response.data }
    }
}