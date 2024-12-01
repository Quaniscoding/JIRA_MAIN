import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listStatus: []
}

const getAllStatus = createSlice({
    name: "getAllStatus",
    initialState,
    reducers: {
        getlistStatus: (state, { type, payload }) => {
            state.listStatus = payload;
        }
    }
});

export const { getlistStatus } = getAllStatus.actions

export default getAllStatus.reducer

export const callGetListStatus = async (dispatch) => {
    try {
        const apiGetProject = await http.get(`/status/getStatus`)
        dispatch(getlistStatus(apiGetProject.data.content));
    } catch (err) {
        console.log(err);
    }

}
