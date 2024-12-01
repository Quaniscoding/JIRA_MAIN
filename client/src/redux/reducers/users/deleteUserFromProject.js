import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    user: []
}

const deleteUserFromProject = createSlice({
    name: "deleteUserFromProject",
    initialState,
    reducers: {}
});

export const { } = deleteUserFromProject.actions

export default deleteUserFromProject.reducer

export const callDeleteUserFromProject = (data) => async () => {
    try {
        const result = await http.post("/project/removeUserFromProject", data);
        return { isDelete: true, message: result.data.message }
    } catch (err) {
        return { isDelete: false, message: err.response.data.message }
    }
}