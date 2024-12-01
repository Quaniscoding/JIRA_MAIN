import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const createTask = createSlice({
    name: "createTask",
    initialState,
    reducers: {}
});

export const { } = createTask.actions

export default createTask.reducer
export const callCreateTask = (data) => async () => {
    try {
        const result = await http.post("/project/createTask", data)
        return { isCreate: true, message: result.data.message }
    } catch (err) {
        return { isCreate: false, message: err.response.data.message }
    }
}