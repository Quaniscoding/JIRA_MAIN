import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const editTask = createSlice({
    name: "editTask",
    initialState,
    reducers: {}
});

export const { } = editTask.actions

export default editTask.reducer
export const callEditTask = (data, taskId) => async () => {
    try {
        const result = await http.put(`/project/updateTask/${taskId}`, data)
        return { isUpdate: true, message: result.data.message }
    } catch (err) {
        return { isUpdate: false, message: err.response.data.message }
    }
}