import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { history } from '../../../utils/history';

const initialState = {

}

const updateProfie = createSlice({
    name: "updateProfie",
    initialState,
    reducers: {}
});

export const { } = updateProfie.actions

export default updateProfie.reducer
export const callUpdateProfile = (data) => async () => {
    try {
        const apiUpdateProfile = await http.put(`/Users/editUser`, data);
        history.push("/profile");
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