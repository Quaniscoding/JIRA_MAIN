import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
const initialState = {
    listProject: []
}

const getAllProject = createSlice({
    name: "getAllProject",
    initialState,
    reducers: {
        getListProject: (state, { type, payload }) => {
            state.listProject = payload;
        }
    }
});

export const { getListProject } = getAllProject.actions
export default getAllProject.reducer
export const callGetListProject = (keyWord) => {
    return async (dispatch) => {
        try {
            if (keyWord != "") {
                const result = await http.get(`/project/getAllProject?keyWord=${keyWord}`)
                dispatch(getListProject(result.data.content));
            }
            else {
                const result = await http.get(`/project/getAllProject`)
                dispatch(getListProject(result.data.content));
            }
        } catch (err) {
            console.log(err);
        }
    }
}
