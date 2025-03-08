import { http } from '../../../utils/baseUrl';

export const callDeleteUser = (userId) => async () => {
    try {
        const result = await http.delete(`/user/deleteUser/${userId}`)
        console.log(result);

        return { message: result.data.message }
    } catch (err) {
        console.log(err);

        return { message: err.response.data.message }
    }
}
