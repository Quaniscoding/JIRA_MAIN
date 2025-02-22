import { http } from '../../../utils/baseUrl';

export const callCreateUser = (data) => async () => {
    try {
        const result = await http.post("/user/createUser", data)
        return { message: result.data.message }
    } catch (err) {
        return err
    }
}
