import { createSlice } from '@reduxjs/toolkit'
// import { history } from '../../../utils/history';
import { http } from './../../../utils/baseUrl';

const initialState = {

}

const updateProject = createSlice({
    name: "updateProject",
    initialState,
    reducers: {}
});

export const { } = updateProject.actions

export default updateProject.reducer

export const callUpdateProject = (projectId, data) => async () => {
    try {
        const apiUpdateProject = await http.put(`/Project/updateProject/${projectId}`, data);
        // history.push("/projectmanagement");
        return { isUpdate: true }
    } catch (err) {
        if (err.response.data.statusCode == 500) {
            return { isError: true }
        }
        else {
            return { isUpdate: false }
        }
    }
}