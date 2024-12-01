import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listComments: []
}

const getComments = createSlice({
    name: "getComments",
    initialState,
    reducers: {
        getListComments: (state, { type, payload }) => {
            state.listComments = payload
        }
    }
});

export const { getListComments } = getComments.actions

export default getComments.reducer
export const callGetListComment = (taskId) => async (dispatch) => {
    try {
        const apiGetComments = await http.get(`/comment/getComment/${taskId}`)
        dispatch(getListComments(apiGetComments.data.content))
    } catch (error) {
        console.log(error);
    }
}