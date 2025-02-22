import { http } from "../../../utils/baseUrl";

export const callSignUp = (userSignUp) => async () => {
    try {
        await http.post("/auth/signup", userSignUp)
        return true
    } catch (err) {
        return err
    }
}
