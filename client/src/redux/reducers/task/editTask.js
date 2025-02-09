import { http } from '../../../utils/baseUrl';

export const callEditTask = (data) => async () => {
    try {
        const result = await http.put(`/project/updateTask/${data.taskId}`, data)
        return { isUpdate: true, message: result.data.message }
    } catch (err) {
        return { isUpdate: false, message: err.response.data.message }
    }
}