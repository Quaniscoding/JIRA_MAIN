import { http } from '../../../utils/baseUrl';

export const callCreateProject = (data) => async () => {
    try {
        const result = await http.post("/project/createProject", data)
        return { isCreate: true, message: result.data.message }
    } catch (err) {
        return { isCreate: false, message: err.response.data.message }
    }
}