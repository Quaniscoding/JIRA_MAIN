import { http } from '../../../utils/baseUrl';
import { saveLocal } from '../../../utils/config';
import { DATA_PROJECT } from '../../../utils/constant';

export const callCreateProject = (data) => async () => {
    try {
        const result = await http.post("/project/createProject", data)
        saveLocal(DATA_PROJECT, result.data.content)
        return { isCreate: true, message: result.data.message }
    } catch (err) {
        return { isCreate: false, message: err.response.message }
    }
}