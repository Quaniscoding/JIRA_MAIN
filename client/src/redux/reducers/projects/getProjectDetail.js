import { http } from '../../../utils/baseUrl';


export const callGetListProjectDetail = (idProject) => async () => {
    try {
        const result = await http.get(`/project/getProjectDetail/${idProject}`)
        return result.data.content
    } catch (err) {
        return err
    }
}
