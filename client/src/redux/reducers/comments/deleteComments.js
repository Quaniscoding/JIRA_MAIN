import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteComments = createSlice({
    name: "deleteComments",
    initialState,
    reducers: {}
});

export const { } = deleteComments.actions

export default deleteComments.reducer
export const callDeleteComments = (commentsId) => async () => {
    try {
        const apiDeleteComments = await http.delete(`/comment/deleteComment/{commentsId}`)
        return { isDelete: true }
    } catch (error) {
        return { isDelete: false }
    }
}