import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
}

const asignUserFromProJet = createSlice({
    name: "asignUserFromProJet",
    initialState,
});

export const { } = asignUserFromProJet.actions

export default asignUserFromProJet.reducer

export const callAsignUserFromProject = (data) => async () => {
    try {
        const result = await http.put("/project/assignUserProject", data);
        return { isAsign: true, message: result.data.message }
    } catch (err) {
        return { isAsign: false, message: err.response.data.message }
    }
}