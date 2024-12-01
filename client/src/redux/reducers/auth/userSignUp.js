import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
// import { history } from '../../../utils/history';
const initialState = {

}
const userSignUp = createSlice({
    name: "userSignUp",
    initialState,
    reducers: {}
});

export const { } = userSignUp.actions

export default userSignUp.reducer

export const callSignUp = (userSignUp) => async () => {
    try {
        await http.post("/user/signup", userSignUp)
        // history.push("/login")
        return { isSignUp: true }
    } catch (err) {
        return new Promise((resolve, reject) =>
            resolve({ isError: true }));
    }
}
