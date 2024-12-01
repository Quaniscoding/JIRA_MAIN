import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listPriority: []
}

const getAllPriority = createSlice({
    name: "getAllPriority",
    initialState,
    reducers: {
        getlistPriority: (state, { type, payload }) => {
            state.listPriority = payload;
        }
    }
});

export const { getlistPriority } = getAllPriority.actions

export default getAllPriority.reducer

export const callGetListPriority = async (dispatch) => {
    try {
        const apiGetProject = await http.get(`/priority/getPriority`)
        dispatch(getlistPriority(apiGetProject.data.content));
    } catch (err) {
        console.log(err);
    }

}
