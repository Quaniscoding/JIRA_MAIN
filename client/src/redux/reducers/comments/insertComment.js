import { createSlice } from '@reduxjs/toolkit'
import { http } from './../../../utils/baseUrl';

const initialState = {

}

const insertComment = createSlice({
    name: "insertComment",
    initialState,
    reducers: {}
});

export const { } = insertComment.actions

export default insertComment.reducer
export const callInsertComments = (data) => async () => {
    try {
        const apiInsertComments = await http.post('/Comment/createComment', data);
        return { isInsert: true }
    } catch (error) {
        return { isInsert: false }
    }
}