import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listUser: []
}

const getUser = createSlice({
    name: "getUser",
    initialState,
    reducers: {
        getListUser: (state, { type, payload }) => {
            state.listUser = payload;
        }
    }
});

export const { getListUser } = getUser.actions

export default getUser.reducer
export const callGetListUser = (keyWord) => async (dispatch) => {
    try {
        if (keyWord) {
            const result = await http.get(`/user/getUser?keyWord=${keyWord}`);
            dispatch(getListUser(result.data.content));
            return { message: result.data.message }
        }
        else {
            const result = await http.get(`/user/getUser}`);
            dispatch(getListUser(result.data.content));
            return { message: result.data.message }
        }
    } catch (err) {
        return { message: err.response.data.message }
    }
}
