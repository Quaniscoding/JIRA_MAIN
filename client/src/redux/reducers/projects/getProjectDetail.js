import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listProjectDetail: []
}

const getProjectDetail = createSlice({
    name: "getProjectDetail",
    initialState,
    reducers: {
        getListProjectDetail: (state, { type, payload }) => {
            state.listProjectDetail = payload;
        }
    }
});

export const { getListProjectDetail } = getProjectDetail.actions

export default getProjectDetail.reducer
export const callGetListProjectDetail = (idProject) => async (dispatch) => {
    try {
        const result = await http.get(`/project/getProjectDetail/${idProject}`)
        dispatch(getListProjectDetail(result.data.content));
    } catch (err) {
        // console.log(err);
    }
}
