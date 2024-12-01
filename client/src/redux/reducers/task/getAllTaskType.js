import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listTaskType: []
}

const getAllTaskType = createSlice({
    name: "getAllTaskType",
    initialState,
    reducers: {
        getlistTaskType: (state, { type, payload }) => {
            state.listTaskType = payload;
        }
    }
});

export const { getlistTaskType } = getAllTaskType.actions

export default getAllTaskType.reducer
export const callGetListTaskType = async (dispatch) => {
    try {
        const apiGetProject = await http.get(`/taskType/getTasktype`)
        dispatch(getlistTaskType(apiGetProject.data.content));
    } catch (err) {
        console.log(err);
    }

}