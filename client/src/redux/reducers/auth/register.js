import { http } from "../../../utils/baseUrl";

export const callRegister = (userSignUp) => async () => {
    try {
        await http.post("/auth/signup", userSignUp)
        return true
    } catch (err) {
        return err
    }
}
