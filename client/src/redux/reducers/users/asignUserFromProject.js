import { http } from '../../../utils/baseUrl';
export const callAsignUserFromProject = (data) => async () => {
    try {
        const result = await http.put("/project/assignUserProject", data);
        return { isAsign: true, message: result.data.message }
    } catch (err) {
        return { isAsign: false, message: err.response.data.message }
    }
}