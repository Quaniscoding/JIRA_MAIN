import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteProject = createSlice({
    name: "deleteProject",
    initialState,
    reducers: {}
});

export const { } = deleteProject.actions

export default deleteProject.reducer

export const callDeleteProject = (idProject) => async () => {
    try {
        const result = await http.delete(`/project/deleteProject/${idProject}`);
        return { isDelete: true, message: result.data.message }
    } catch (err) {
        return { isDelete: false, message: err.response.data.message }
    }
}