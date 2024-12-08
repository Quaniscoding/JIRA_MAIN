import { http } from '../../../utils/baseUrl';

export const callDeleteProject = (idProject) => async () => {
    try {
        const result = await http.delete(`/project/deleteProject/${idProject}`);
        return { isDelete: true, message: result.data.message }
    } catch (err) {
        return { isDelete: false, message: err.response.data.message }
    }
}