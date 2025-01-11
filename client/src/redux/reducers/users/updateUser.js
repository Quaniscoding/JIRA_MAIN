import { http } from '../../../utils/baseUrl';

export const callUpdateUser = (id, data) => async () => {
    try {
        const result = await http.put(`/user/updateUser/${id}`, data)
        return { isUpdate: true, message: result.data.message }
    } catch (err) {
        return { isUpdate: false, message: err.response.data.message }
    }
}