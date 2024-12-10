import { http } from '../../../utils/baseUrl';

export const callCreateTask = (data) => async () => {
    try {
        const result = await http.post("/project/createTask", data)
        return { isCreate: true, message: result.data.message }
    } catch (err) {
        return { isCreate: false, message: err.response.data.message }
    }
}